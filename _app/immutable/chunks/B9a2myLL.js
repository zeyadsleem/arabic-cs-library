const s="kinney",a="react-typescript",n="React مع TypeScript",l="deleting-todos-state-cleanup",t="طلبات DELETE وتنظيف الحالة",p=[{depth:2,id:"النمط-الأساسي-للحذف",text:"النمط الأساسي للحذف"},{depth:2,id:"الحذف-المتفائل-مع-التراجع",text:"الحذف المتفائل مع التراجع"},{depth:2,id:"نمط-نافذة-التأكيد",text:"نمط نافذة التأكيد"},{depth:2,id:"نمط-الحذف-الناعم",text:"نمط الحذف الناعم"},{depth:2,id:"عمليات-الحذف-بالدفعات",text:"عمليات الحذف بالدفعات"},{depth:2,id:"عمليات-الحذف-المتتالية",text:"عمليات الحذف المتتالية"},{depth:2,id:"خطاف-مخصص-لعمليات-الحذف",text:"خُطّاف مخصّص لعمليات الحذف"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"ما-التالي",text:"ما التالي؟"}],e=`<p>يبدو حذف البيانات بسيطًا — أزله من المصفوفة واعتبر الأمر منتهيًا. لكن تطبيقات الإنتاج تحتاج إلى نوافذ تأكيد، وإمكانية التراجع (undo)، والحذف الناعم (soft delete)، وتنظيف سليم للبيانات المرتبطة. يساعدنا TypeScript على تنفيذ هذه الأنماط بأمان، ويضمن تعاملنا مع جميع الحالات الحدّية التي تصاحب العمليات المدمّرة.</p>
<h2 id="النمط-الأساسي-للحذف">النمط الأساسي للحذف</h2>
<p>لنبدأ بتنفيذ حذف بسيط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">BasicTodoDeleter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isDeleting, setIsDeleting] = useState&lt;<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setIsDeleting</span>(todoId);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to delete todo&#x27;</span>);
      }

      <span class="hljs-comment">// Remove from local state</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">id</span> !== todoId));
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Delete failed&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsDeleting</span>(<span class="hljs-literal">null</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> deleteTodo(todo.id)} disabled={isDeleting === todo.id}&gt;
              {isDeleting === todo.id ? &#x27;Deleting...&#x27; : &#x27;🗑️&#x27;}
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الحذف-المتفائل-مع-التراجع">الحذف المتفائل مع التراجع</h2>
<p>نفّذ حذفًا فوريًا مع إمكانية التراجع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DeletedTodo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">deletedAt</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">undoTimeout</span>?: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UndoableTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [deletedTodos, setDeletedTodos] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-title class_">DeletedTodo</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());
  <span class="hljs-keyword">const</span> [deletingIds, setDeletingIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

  <span class="hljs-keyword">const</span> <span class="hljs-variable constant_">UNDO_DURATION</span> = <span class="hljs-number">5000</span>; <span class="hljs-comment">// 5 seconds to undo</span>

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteTodo</span> = (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> todo = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === todoId);
    <span class="hljs-keyword">if</span> (!todo) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Immediately remove from UI (optimistic)</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> !== todoId));

    <span class="hljs-comment">// Store for undo</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">deletedTodo</span>: <span class="hljs-title class_">DeletedTodo</span> = {
      ...todo,
      <span class="hljs-attr">deletedAt</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    };

    <span class="hljs-comment">// Set timeout to permanently delete</span>
    <span class="hljs-keyword">const</span> timeout = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">permanentlyDelete</span>(todoId);
    }, <span class="hljs-variable constant_">UNDO_DURATION</span>);

    deletedTodo.<span class="hljs-property">undoTimeout</span> = timeout;

    <span class="hljs-title function_">setDeletedTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(todoId, deletedTodo));
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">permanentlyDelete</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setDeletingIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev).<span class="hljs-title function_">add</span>(todoId));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to delete&#x27;</span>);
      }

      <span class="hljs-comment">// Remove from deleted items</span>
      <span class="hljs-title function_">setDeletedTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
        next.<span class="hljs-title function_">delete</span>(todoId);
        <span class="hljs-keyword">return</span> next;
      });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// On failure, restore the todo</span>
      <span class="hljs-keyword">const</span> deletedTodo = deletedTodos.<span class="hljs-title function_">get</span>(todoId);
      <span class="hljs-keyword">if</span> (deletedTodo) {
        <span class="hljs-keyword">const</span> { deletedAt, undoTimeout, ...todo } = deletedTodo;
        <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, todo].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">id</span> - b.<span class="hljs-property">id</span>));
      }

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Delete failed:&#x27;</span>, error);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setDeletingIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
        next.<span class="hljs-title function_">delete</span>(todoId);
        <span class="hljs-keyword">return</span> next;
      });
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">undoDelete</span> = (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> deletedTodo = deletedTodos.<span class="hljs-title function_">get</span>(todoId);
    <span class="hljs-keyword">if</span> (!deletedTodo) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Clear the timeout</span>
    <span class="hljs-keyword">if</span> (deletedTodo.<span class="hljs-property">undoTimeout</span>) {
      <span class="hljs-built_in">clearTimeout</span>(deletedTodo.<span class="hljs-property">undoTimeout</span>);
    }

    <span class="hljs-comment">// Restore the todo</span>
    <span class="hljs-keyword">const</span> { deletedAt, undoTimeout, ...todo } = deletedTodo;
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, todo].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">id</span> - b.<span class="hljs-property">id</span>));

    <span class="hljs-comment">// Remove from deleted</span>
    <span class="hljs-title function_">setDeletedTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
      next.<span class="hljs-title function_">delete</span>(todoId);
      <span class="hljs-keyword">return</span> next;
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> deleteTodo(todo.id)}&gt;Delete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

      {deletedTodos.size &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;undo-container&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Recently Deleted<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          {Array.from(deletedTodos.values()).map((todo) =&gt; {
            const isDeleting = deletingIds.has(todo.id);
            const timeLeft = Math.max(0, UNDO_DURATION - (Date.now() - todo.deletedAt));

            return (
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;undo-item&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                {isDeleting ? (
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Permanently deleting...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                ) : (
                  <span class="hljs-tag">&lt;&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> undoDelete(todo.id)}&gt;
                      Undo ({Math.ceil(timeLeft / 1000)}s)
                    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> permanentlyDelete(todo.id)}&gt;Delete Now<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                  <span class="hljs-tag">&lt;/&gt;</span>
                )}
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            );
          })}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      )}
    &lt;/div&gt;
  );
}
</code></pre>
<h2 id="نمط-نافذة-التأكيد">نمط نافذة التأكيد</h2>
<p>أضف خطوة تأكيد قبل الإجراءات المدمّرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ConfirmDialogProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">confirmText</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">cancelText</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onConfirm</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onCancel</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">danger</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConfirmDialog</span>(<span class="hljs-params">{
  isOpen,
  title,
  message,
  confirmText = <span class="hljs-string">&#x27;Confirm&#x27;</span>,
  cancelText = <span class="hljs-string">&#x27;Cancel&#x27;</span>,
  onConfirm,
  onCancel,
  danger = <span class="hljs-literal">false</span>,
}: <span class="hljs-title class_">ConfirmDialogProps</span></span>) {
  <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;dialog-overlay&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onCancel}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;dialog&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> e.stopPropagation()}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;dialog-buttons&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onCancel}</span>&gt;</span>{cancelText}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onConfirm}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{danger</span> ? &#x27;<span class="hljs-attr">danger</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}&gt;</span>
            {confirmText}
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodosWithConfirmDelete</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [todoToDelete, setTodoToDelete] = useState&lt;<span class="hljs-title class_">Todo</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isDeleting, setIsDeleting] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleDeleteClick</span> = (<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
    <span class="hljs-title function_">setTodoToDelete</span>(todo);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">confirmDelete</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!todoToDelete) <span class="hljs-keyword">return</span>;

    <span class="hljs-title function_">setIsDeleting</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
        <span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoToDelete.id}</span>\`</span>,
        { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span> },
      );

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to delete todo&#x27;</span>);
      }

      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> !== todoToDelete.<span class="hljs-property">id</span>));
      <span class="hljs-title function_">setTodoToDelete</span>(<span class="hljs-literal">null</span>);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Delete failed:&#x27;</span>, error);
      <span class="hljs-title function_">alert</span>(<span class="hljs-string">&#x27;Failed to delete todo. Please try again.&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsDeleting</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">cancelDelete</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setTodoToDelete</span>(<span class="hljs-literal">null</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> handleDeleteClick(todo)}&gt;Delete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ConfirmDialog</span>
        <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{todoToDelete</span> !== <span class="hljs-string">null}</span>
        <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Delete Todo?&quot;</span>
        <span class="hljs-attr">message</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">Are</span> <span class="hljs-attr">you</span> <span class="hljs-attr">sure</span> <span class="hljs-attr">you</span> <span class="hljs-attr">want</span> <span class="hljs-attr">to</span> <span class="hljs-attr">delete</span> &quot;\${<span class="hljs-attr">todoToDelete</span>?<span class="hljs-attr">.title</span>}&quot;? <span class="hljs-attr">This</span> <span class="hljs-attr">action</span> <span class="hljs-attr">cannot</span> <span class="hljs-attr">be</span> <span class="hljs-attr">undone.</span>\`}
        <span class="hljs-attr">confirmText</span>=<span class="hljs-string">{isDeleting</span> ? &#x27;<span class="hljs-attr">Deleting...</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">Delete</span>&#x27;}
        <span class="hljs-attr">cancelText</span>=<span class="hljs-string">&quot;Keep&quot;</span>
        <span class="hljs-attr">onConfirm</span>=<span class="hljs-string">{confirmDelete}</span>
        <span class="hljs-attr">onCancel</span>=<span class="hljs-string">{cancelDelete}</span>
        <span class="hljs-attr">danger</span>
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="نمط-الحذف-الناعم">نمط الحذف الناعم</h2>
<p>نفّذ حذفًا ناعمًا تُوسم فيه العناصر كمحذوفة دون إزالتها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SoftDeletableTodo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">deletedAt</span>?: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">deletedBy</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SoftDeleteTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">SoftDeletableTodo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [showDeleted, setShowDeleted] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [filter, setFilter] = useState&lt;<span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;deleted&#x27;</span>&gt;(<span class="hljs-string">&#x27;active&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">softDelete</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-comment">// Mark as deleted locally</span>
    <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">deletedAt</span>: now, <span class="hljs-attr">deletedBy</span>: <span class="hljs-string">&#x27;current-user&#x27;</span> } : todo,
      ),
    );

    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Send soft delete to server</span>
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
          <span class="hljs-attr">deletedAt</span>: now.<span class="hljs-title function_">toISOString</span>(),
          <span class="hljs-attr">deletedBy</span>: <span class="hljs-string">&#x27;current-user&#x27;</span>,
        }),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to soft delete&#x27;</span>);
      }
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Rollback on failure</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
          todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">deletedAt</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">deletedBy</span>: <span class="hljs-literal">undefined</span> } : todo,
        ),
      );

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Soft delete failed:&#x27;</span>, error);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">restore</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-comment">// Restore locally</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">deletedAt</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">deletedBy</span>: <span class="hljs-literal">undefined</span> } : todo,
      ),
    );

    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Send restore to server</span>
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
          <span class="hljs-attr">deletedAt</span>: <span class="hljs-literal">null</span>,
          <span class="hljs-attr">deletedBy</span>: <span class="hljs-literal">null</span>,
        }),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to restore&#x27;</span>);
      }
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Re-mark as deleted on failure</span>
      <span class="hljs-keyword">const</span> todo = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === todoId);
      <span class="hljs-keyword">if</span> (todo &amp;&amp; todo.<span class="hljs-property">deletedAt</span>) {
        <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
          prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
            t.<span class="hljs-property">id</span> === todoId ? { ...t, <span class="hljs-attr">deletedAt</span>: todo.<span class="hljs-property">deletedAt</span>, <span class="hljs-attr">deletedBy</span>: todo.<span class="hljs-property">deletedBy</span> } : t,
          ),
        );
      }

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Restore failed:&#x27;</span>, error);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">permanentlyDelete</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> todo = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === todoId);
    <span class="hljs-keyword">if</span> (!todo) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Remove from local state</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> !== todoId));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to permanently delete&#x27;</span>);
      }
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Restore on failure</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, todo]);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Permanent delete failed:&#x27;</span>, error);
    }
  };

  <span class="hljs-keyword">const</span> filteredTodos = todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-keyword">return</span> !todo.<span class="hljs-property">deletedAt</span>;
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;deleted&#x27;</span>) <span class="hljs-keyword">return</span> !!todo.<span class="hljs-property">deletedAt</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;filters&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;active&#x27;)} className={filter === &#x27;active&#x27; ? &#x27;active&#x27; : &#x27;&#x27;}&gt;
          Active ({todos.filter((t) =&gt; !t.deletedAt).length})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;deleted&#x27;)}
          className={filter === &#x27;deleted&#x27; ? &#x27;active&#x27; : &#x27;&#x27;}
        &gt;
          Deleted ({todos.filter((t) =&gt; !!t.deletedAt).length})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;all&#x27;)} className={filter === &#x27;all&#x27; ? &#x27;active&#x27; : &#x27;&#x27;}&gt;
          All ({todos.length})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {filteredTodos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
            <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
              <span class="hljs-attr">opacity:</span> <span class="hljs-attr">todo.deletedAt</span> ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>,
              <span class="hljs-attr">textDecoration:</span> <span class="hljs-attr">todo.deletedAt</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
            }}
          &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            {todo.deletedAt ? (
              <span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> (Deleted {todo.deletedAt.toLocaleDateString()})<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> restore(todo.id)}&gt;Restore<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> permanentlyDelete(todo.id)}&gt;Delete Forever<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
              <span class="hljs-tag">&lt;/&gt;</span>
            ) : (
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> softDelete(todo.id)}&gt;Delete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            )}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    &lt;/div&gt;
  );
}
</code></pre>
<h2 id="عمليات-الحذف-بالدفعات">عمليات الحذف بالدفعات</h2>
<p>احذف عناصر متعدّدة بكفاءة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">BatchDeleteTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [selectedIds, setSelectedIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  <span class="hljs-keyword">const</span> [isDeleting, setIsDeleting] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [deleteResults, setDeleteResults] = useState&lt;{
    <span class="hljs-attr">successful</span>: <span class="hljs-built_in">number</span>[];
    <span class="hljs-attr">failed</span>: <span class="hljs-built_in">number</span>[];
  } | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

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

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteSelected</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (selectedIds.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> idsToDelete = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(selectedIds);
    <span class="hljs-title function_">setIsDeleting</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Optimistically remove from UI</span>
    <span class="hljs-keyword">const</span> todosToDelete = todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> selectedIds.<span class="hljs-title function_">has</span>(t.<span class="hljs-property">id</span>));
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> !selectedIds.<span class="hljs-title function_">has</span>(t.<span class="hljs-property">id</span>)));

    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">allSettled</span>(
      idsToDelete.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span>
        <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
          <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
        }).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (!res.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to delete <span class="hljs-subst">\${id}</span>\`</span>);
          <span class="hljs-keyword">return</span> id;
        }),
      ),
    );

    <span class="hljs-keyword">const</span> <span class="hljs-attr">successful</span>: <span class="hljs-built_in">number</span>[] = [];
    <span class="hljs-keyword">const</span> <span class="hljs-attr">failed</span>: <span class="hljs-built_in">number</span>[] = [];

    results.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">result, index</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> todoId = idsToDelete[index];
      <span class="hljs-keyword">if</span> (result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span>) {
        successful.<span class="hljs-title function_">push</span>(todoId);
      } <span class="hljs-keyword">else</span> {
        failed.<span class="hljs-title function_">push</span>(todoId);
      }
    });

    <span class="hljs-comment">// Restore failed deletions</span>
    <span class="hljs-keyword">if</span> (failed.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">const</span> failedTodos = todosToDelete.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> failed.<span class="hljs-title function_">includes</span>(t.<span class="hljs-property">id</span>));
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, ...failedTodos].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">id</span> - b.<span class="hljs-property">id</span>));
    }

    <span class="hljs-title function_">setDeleteResults</span>({ successful, failed });
    <span class="hljs-title function_">setIsDeleting</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

    <span class="hljs-comment">// Clear results after 5 seconds</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setDeleteResults</span>(<span class="hljs-literal">null</span>);
    }, <span class="hljs-number">5000</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;batch-controls&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{selectAll}</span>&gt;</span>Select All<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{deselectAll}</span>&gt;</span>Clear Selection<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{deleteSelected}</span>
          <span class="hljs-attr">disabled</span>=<span class="hljs-string">{selectedIds.size</span> === <span class="hljs-string">0</span> || <span class="hljs-attr">isDeleting</span>}
          <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;danger&quot;</span>
        &gt;</span>
          Delete Selected ({selectedIds.size})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {deleteResults &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;results&quot;</span>&gt;</span>
          {deleteResults.successful.length &gt; 0 &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>✅ Deleted {deleteResults.successful.length} todos<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          )}
          {deleteResults.failed.length &gt; 0 &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>❌ Failed to delete {deleteResults.failed.length} todos<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
              <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
              <span class="hljs-attr">checked</span>=<span class="hljs-string">{selectedIds.has(todo.id)}</span>
              <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleSelection(todo.id)}
              disabled={isDeleting}
            /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
              <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
                <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isDeleting</span> &amp;&amp; <span class="hljs-attr">selectedIds.has</span>(<span class="hljs-attr">todo.id</span>) ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>,
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
<h2 id="عمليات-الحذف-المتتالية">عمليات الحذف المتتالية</h2>
<p>تعامل مع حذف البيانات المرتبطة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoWithSubtasks</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">subtasks</span>?: <span class="hljs-title class_">Subtask</span>[];
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Subtask</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CascadingDeleteTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">TodoWithSubtasks</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [deletionProgress, setDeletionProgress] = useState&lt;{
    <span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">progress</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
  } | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteTodoWithSubtasks</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">TodoWithSubtasks</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> subtasks = todo.<span class="hljs-property">subtasks</span> || [];
    <span class="hljs-keyword">const</span> total = subtasks.<span class="hljs-property">length</span> + <span class="hljs-number">1</span>; <span class="hljs-comment">// subtasks + main todo</span>
    <span class="hljs-keyword">let</span> completed = <span class="hljs-number">0</span>;

    <span class="hljs-title function_">setDeletionProgress</span>({
      <span class="hljs-attr">todoId</span>: todo.<span class="hljs-property">id</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Deleting subtasks...&#x27;</span>,
      <span class="hljs-attr">progress</span>: <span class="hljs-number">0</span>,
      total,
    });

    <span class="hljs-comment">// Delete subtasks first</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> subtask <span class="hljs-keyword">of</span> subtasks) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/subtasks/<span class="hljs-subst">\${subtask.id}</span>\`</span>, { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span> });
        completed++;
        <span class="hljs-title function_">setDeletionProgress</span>({
          <span class="hljs-attr">todoId</span>: todo.<span class="hljs-property">id</span>,
          <span class="hljs-attr">message</span>: <span class="hljs-string">\`Deleted <span class="hljs-subst">\${completed}</span> of <span class="hljs-subst">\${subtasks.length}</span> subtasks\`</span>,
          <span class="hljs-attr">progress</span>: completed,
          total,
        });
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Failed to delete subtask <span class="hljs-subst">\${subtask.id}</span>:\`</span>, error);
      }
    }

    <span class="hljs-comment">// Then delete the main todo</span>
    <span class="hljs-title function_">setDeletionProgress</span>({
      <span class="hljs-attr">todoId</span>: todo.<span class="hljs-property">id</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Deleting main todo...&#x27;</span>,
      <span class="hljs-attr">progress</span>: completed,
      total,
    });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todo.id}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
      });

      <span class="hljs-comment">// Remove from state</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> !== todo.<span class="hljs-property">id</span>));

      <span class="hljs-title function_">setDeletionProgress</span>({
        <span class="hljs-attr">todoId</span>: todo.<span class="hljs-property">id</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Completed!&#x27;</span>,
        <span class="hljs-attr">progress</span>: total,
        total,
      });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to delete todo:&#x27;</span>, error);
      <span class="hljs-title function_">setDeletionProgress</span>({
        <span class="hljs-attr">todoId</span>: todo.<span class="hljs-property">id</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Failed to delete main todo&#x27;</span>,
        <span class="hljs-attr">progress</span>: completed,
        total,
      });
    }

    <span class="hljs-comment">// Clear progress after 2 seconds</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setDeletionProgress</span>(<span class="hljs-literal">null</span>);
    }, <span class="hljs-number">2000</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {deletionProgress &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;progress-bar&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{deletionProgress.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">progress</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{deletionProgress.progress}</span> <span class="hljs-attr">max</span>=<span class="hljs-string">{deletionProgress.total}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              {todo.subtasks &amp;&amp; todo.subtasks.length &gt; 0 &amp;&amp; (
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> ({todo.subtasks.length} subtasks)<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              )}
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> deleteTodoWithSubtasks(todo)}
                disabled={deletionProgress?.todoId === todo.id}
              &gt;
                Delete All
              <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            {todo.subtasks &amp;&amp; (
              <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                {todo.subtasks.map((subtask) =&gt; (
                  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{subtask.id}</span>&gt;</span>- {subtask.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                ))}
              <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            )}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="خطاف-مخصص-لعمليات-الحذف">خُطّاف مخصّص لعمليات الحذف</h2>
<p>اجمع منطق الحذف داخل خُطّاف قابل لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseDeleteOptions</span> {
  <span class="hljs-attr">onSuccess</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">confirmation</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">undoDuration</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> useDelete&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span> }&gt;(
  <span class="hljs-attr">items</span>: T[],
  <span class="hljs-attr">setItems</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">Dispatch</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SetStateAction</span>&lt;T[]&gt;&gt;,
  <span class="hljs-attr">deleteFn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;,
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">UseDeleteOptions</span> = {},
) {
  <span class="hljs-keyword">const</span> [deletingIds, setDeletingIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  <span class="hljs-keyword">const</span> [undoableDeletes, setUndoableDeletes] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, T&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

  <span class="hljs-keyword">const</span> deleteItem = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>) =&gt; {
      <span class="hljs-keyword">const</span> item = items.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> === id);
      <span class="hljs-keyword">if</span> (!item) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">if</span> (options.<span class="hljs-property">undoDuration</span>) {
        <span class="hljs-comment">// Soft delete with undo</span>
        <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> !== id));
        <span class="hljs-title function_">setUndoableDeletes</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(id, item));

        <span class="hljs-built_in">setTimeout</span>(<span class="hljs-title function_">async</span> () =&gt; {
          <span class="hljs-keyword">const</span> stillUndoable = undoableDeletes.<span class="hljs-title function_">has</span>(id);
          <span class="hljs-keyword">if</span> (stillUndoable) {
            <span class="hljs-keyword">await</span> <span class="hljs-title function_">performDelete</span>(id);
          }
        }, options.<span class="hljs-property">undoDuration</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">performDelete</span>(id);
      }
    },
    [items, setItems, options.<span class="hljs-property">undoDuration</span>],
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">performDelete</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setDeletingIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev).<span class="hljs-title function_">add</span>(id));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">deleteFn</span>(id);
      <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> !== id));
      <span class="hljs-title function_">setUndoableDeletes</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
        next.<span class="hljs-title function_">delete</span>(id);
        <span class="hljs-keyword">return</span> next;
      });
      options.<span class="hljs-property">onSuccess</span>?.(id);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">const</span> err = error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Delete failed&#x27;</span>);
      options.<span class="hljs-property">onError</span>?.(err, id);

      <span class="hljs-comment">// Restore if it was undoable</span>
      <span class="hljs-keyword">const</span> item = undoableDeletes.<span class="hljs-title function_">get</span>(id);
      <span class="hljs-keyword">if</span> (item) {
        <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, item].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">id</span> - b.<span class="hljs-property">id</span>));
      }
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setDeletingIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
        next.<span class="hljs-title function_">delete</span>(id);
        <span class="hljs-keyword">return</span> next;
      });
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">undo</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> item = undoableDeletes.<span class="hljs-title function_">get</span>(id);
    <span class="hljs-keyword">if</span> (item) {
      <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, item].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">id</span> - b.<span class="hljs-property">id</span>));
      <span class="hljs-title function_">setUndoableDeletes</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
        next.<span class="hljs-title function_">delete</span>(id);
        <span class="hljs-keyword">return</span> next;
      });
    }
  };

  <span class="hljs-keyword">return</span> {
    deleteItem,
    undo,
    <span class="hljs-attr">isDeleting</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> deletingIds.<span class="hljs-title function_">has</span>(id),
    <span class="hljs-attr">canUndo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> undoableDeletes.<span class="hljs-title function_">has</span>(id),
    <span class="hljs-attr">deletingCount</span>: deletingIds.<span class="hljs-property">size</span>,
  };
}
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>أكّد دائمًا الإجراءات المدمّرة</strong> — استخدم نوافذ التأكيد أو إمكانية التراجع</li>
<li><strong>نفّذ الحذف الناعم متى أمكن</strong> — أبقِ البيانات قابلة للاسترجاع</li>
<li><strong>تعامل مع عمليات الحذف المتتالية بعناية</strong> — نظّف البيانات المرتبطة</li>
<li><strong>قدّم تغذية راجعة أثناء الحذف</strong> — اعرض التقدّم للعمليات الجماعية</li>
<li><strong>اختبر الحالات الحدّية</strong> — أعطال الشبكة، والحذف المتزامن، وما شابه</li>
</ol>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تتطلّب عمليات الحذف السليمة ما يلي:</p>
<ul>
<li>تأكيد قبل الإجراءات المدمّرة</li>
<li>إمكانية تراجع لتجربة استخدام أفضل</li>
<li>أنماط حذف ناعم لاسترجاع البيانات</li>
<li>عمليات بالدفعات لزيادة الكفاءة</li>
<li>تنظيف سليم للحالة ومعالجة الأخطاء</li>
</ul>
<h2 id="ما-التالي">ما التالي؟</h2>
<p>لنجمع كل ذلك معًا الآن في تطبيق مهام متكامل يعمل بعمليات CRUD.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
