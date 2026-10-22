---
title: "التحديثات المتفائلة"
---

تحديث المهام هو النقطة التي تلتقي فيها تجربة المستخدم بالتعقيد التقني. يتوقّع المستخدمون تغذية راجعة فورية حين يعلّمون مهمة على أنها منجزة، لكن طلبات الشبكة تستغرق وقتًا. تحلّ التحديثات المتفائلة هذه المشكلة بتحديث واجهة المستخدم فورًا بينما يجري الطلب في الخلفية. يساعدنا TypeScript على تنفيذ هذا النمط بأمان، ويضمن تعاملنا مع حالتي النجاح والفشل على نحو سليم.

## PUT مقابل PATCH: فهم الفرق

قبل الغوص في الشيفرة، لنوضّح متى نستخدم PUT ومتى نستخدم PATCH:

```typescript
// PUT: Replace entire resource
interface PutTodoDTO {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// PATCH: Update specific fields
interface PatchTodoDTO {
  title?: string;
  completed?: boolean;
}

// Example: Toggle completion with PATCH (more efficient)
const toggleTodo = async (todo: Todo) => {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed }),
  });
  return response.json();
};

// Example: Full update with PUT
const updateEntireTodo = async (todo: Todo) => {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.json();
};
```

## النمط الأساسي للتحديث

لنبدأ بتحديث بسيط دون سلوك متفائل:

```typescript
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function BasicTodoUpdater() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load initial todos
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    setIsUpdating(id);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo: Todo = await response.json();

      // Update local state with server response
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setIsUpdating(null);
    }
  };

  const toggleComplete = (todo: Todo) => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
              disabled={isUpdating === todo.id}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: isUpdating === todo.id ? 0.5 : 1,
              }}
            >
              {todo.title}
            </span>
            {isUpdating === todo.id && <span> Updating...</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## التحديثات المتفائلة مع التراجع

الآن لننفّذ تحديثات متفائلة تتراجع عند الفشل:

```typescript
interface OptimisticUpdate {
  todoId: number;
  previousState: Todo;
  newState: Todo;
  timestamp: number;
}

function OptimisticTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<Map<number, OptimisticUpdate>>(new Map());
  const [failedUpdates, setFailedUpdates] = useState<Set<number>>(new Set());

  const updateTodoOptimistically = async (todoId: number, updates: Partial<Todo>) => {
    // Find current todo
    const currentTodo = todos.find((t) => t.id === todoId);
    if (!currentTodo) return;

    // Create optimistic state
    const optimisticTodo = { ...currentTodo, ...updates };

    // Store the update for potential rollback
    const update: OptimisticUpdate = {
      todoId,
      previousState: currentTodo,
      newState: optimisticTodo,
      timestamp: Date.now(),
    };

    setPendingUpdates((prev) => new Map(prev).set(todoId, update));
    setFailedUpdates((prev) => {
      const next = new Set(prev);
      next.delete(todoId);
      return next;
    });

    // Apply optimistic update immediately
    setTodos((prev) => prev.map((todo) => (todo.id === todoId ? optimisticTodo : todo)));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const serverTodo: Todo = await response.json();

      // Update with server response
      setTodos((prev) => prev.map((todo) => (todo.id === todoId ? serverTodo : todo)));

      // Remove from pending
      setPendingUpdates((prev) => {
        const next = new Map(prev);
        next.delete(todoId);
        return next;
      });
    } catch (error) {
      // Rollback on failure
      setTodos((prev) => prev.map((todo) => (todo.id === todoId ? currentTodo : todo)));

      // Mark as failed
      setFailedUpdates((prev) => new Set(prev).add(todoId));

      // Remove from pending
      setPendingUpdates((prev) => {
        const next = new Map(prev);
        next.delete(todoId);
        return next;
      });

      // Optionally, auto-retry after delay
      setTimeout(() => {
        setFailedUpdates((prev) => {
          const next = new Set(prev);
          next.delete(todoId);
          return next;
        });
      }, 3000);
    }
  };

  const toggleTodo = (todo: Todo) => {
    updateTodoOptimistically(todo.id, { completed: !todo.completed });
  };

  const retryUpdate = (todoId: number) => {
    const update = pendingUpdates.get(todoId);
    if (update) {
      const updates = Object.keys(update.newState).reduce((acc, key) => {
        const k = key as keyof Todo;
        if (update.newState[k] !== update.previousState[k]) {
          acc[k] = update.newState[k];
        }
        return acc;
      }, {} as Partial<Todo>);

      updateTodoOptimistically(todoId, updates);
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => {
          const isPending = pendingUpdates.has(todo.id);
          const hasFailed = failedUpdates.has(todo.id);

          return (
            <li
              key={todo.id}
              style={{
                opacity: isPending ? 0.7 : 1,
                color: hasFailed ? 'red' : 'inherit',
              }}
            >
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)} />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </span>
              {isPending && <span> ⏳</span>}
              {hasFailed && (
                <>
                  <span> ❌ Failed</span>
                  <button onClick={() => retryUpdate(todo.id)}>Retry</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

## التحرير المضمّن باستخدام TypeScript

نفّذ تحريرًا مضمّنًا مع سلامة أنواع سليمة:

```typescript
interface EditableTodo extends Todo {
  isEditing?: boolean;
  editText?: string;
}

function InlineEditTodos() {
  const [todos, setTodos] = useState<EditableTodo[]>([]);
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());

  const startEditing = (todoId: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, isEditing: true, editText: todo.title } : todo,
      ),
    );
  };

  const cancelEditing = (todoId: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, isEditing: false, editText: undefined } : todo,
      ),
    );
  };

  const updateEditText = (todoId: number, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? { ...todo, editText: text } : todo)),
    );
  };

  const saveEdit = async (todoId: number) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo || !todo.editText?.trim()) {
      cancelEditing(todoId);
      return;
    }

    const newTitle = todo.editText.trim();

    // Optimistically update
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId ? { ...t, title: newTitle, isEditing: false, editText: undefined } : t,
      ),
    );

    setSavingIds((prev) => new Set(prev).add(todoId));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      const updated: Todo = await response.json();

      setTodos((prev) => prev.map((t) => (t.id === todoId ? { ...updated, isEditing: false } : t)));
    } catch (error) {
      // Rollback
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todoId ? { ...t, title: todo.title, isEditing: false, editText: undefined } : t,
        ),
      );

      alert('Failed to save. Please try again.');
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(todoId);
        return next;
      });
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => {
          const isSaving = savingIds.has(todo.id);

          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  /* toggle handler */
                }}
              />

              {todo.isEditing ? (
                <>
                  <input
                    type="text"
                    value={todo.editText || ''}
                    onChange={(e) => updateEditText(todo.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(todo.id);
                      if (e.key === 'Escape') cancelEditing(todo.id);
                    }}
                    disabled={isSaving}
                    autoFocus
                  />
                  <button onClick={() => saveEdit(todo.id)} disabled={isSaving}>
                    {isSaving ? '💾' : '✓'}
                  </button>
                  <button onClick={() => cancelEditing(todo.id)} disabled={isSaving}>
                    ✗
                  </button>
                </>
              ) : (
                <>
                  <span
                    onDoubleClick={() => startEditing(todo.id)}
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      cursor: 'text',
                    }}
                  >
                    {todo.title}
                  </span>
                  {isSaving && <span> 💾</span>}
                </>
              )}
            </li>
          );
        })}
      </ul>
      <p className="hint">Double-click to edit</p>
    </div>
  );
}
```

## التحديثات الدفعية

أحيانًا تحتاج إلى تحديث عدة مهام دفعة واحدة:

```typescript
interface BatchUpdateOperation {
  ids: number[];
  updates: Partial<Todo>;
}

function BatchUpdateTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isBatchUpdating, setIsBatchUpdating] = useState(false);

  const toggleSelection = (todoId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(todoId)) {
        next.delete(todoId);
      } else {
        next.add(todoId);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(todos.map((t) => t.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const batchUpdate = async (operation: BatchUpdateOperation) => {
    if (operation.ids.length === 0) return;

    setIsBatchUpdating(true);

    // Store original states for rollback
    const originalStates = new Map<number, Todo>();
    operation.ids.forEach((id) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) originalStates.set(id, todo);
    });

    // Apply optimistic updates
    setTodos((prev) =>
      prev.map((todo) =>
        operation.ids.includes(todo.id) ? { ...todo, ...operation.updates } : todo,
      ),
    );

    const results = await Promise.allSettled(
      operation.ids.map((id) =>
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(operation.updates),
        }).then((res) => {
          if (!res.ok) throw new Error(`Failed to update todo ${id}`);
          return res.json();
        }),
      ),
    );

    // Process results
    const successIds = new Set<number>();
    const failedIds = new Set<number>();

    results.forEach((result, index) => {
      const todoId = operation.ids[index];
      if (result.status === 'fulfilled') {
        successIds.add(todoId);
      } else {
        failedIds.add(todoId);
      }
    });

    // Rollback failed updates
    if (failedIds.size > 0) {
      setTodos((prev) =>
        prev.map((todo) => {
          if (failedIds.has(todo.id)) {
            const original = originalStates.get(todo.id);
            return original || todo;
          }
          return todo;
        }),
      );

      alert(`Failed to update ${failedIds.size} todo(s)`);
    }

    setIsBatchUpdating(false);
    setSelectedIds(new Set());
  };

  const markSelectedComplete = () => {
    batchUpdate({
      ids: Array.from(selectedIds),
      updates: { completed: true },
    });
  };

  const markSelectedIncomplete = () => {
    batchUpdate({
      ids: Array.from(selectedIds),
      updates: { completed: false },
    });
  };

  return (
    <div>
      <div className="batch-controls">
        <button onClick={selectAll}>Select All</button>
        <button onClick={deselectAll}>Deselect All</button>
        <button onClick={markSelectedComplete} disabled={selectedIds.size === 0 || isBatchUpdating}>
          Mark Complete ({selectedIds.size})
        </button>
        <button
          onClick={markSelectedIncomplete}
          disabled={selectedIds.size === 0 || isBatchUpdating}
        >
          Mark Incomplete ({selectedIds.size})
        </button>
      </div>

      {isBatchUpdating && <div>Updating selected todos...</div>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={selectedIds.has(todo.id)}
              onChange={() => toggleSelection(todo.id)}
              disabled={isBatchUpdating}
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                /* individual toggle */
              }}
              disabled={isBatchUpdating}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: isBatchUpdating && selectedIds.has(todo.id) ? 0.5 : 1,
              }}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## خُطّاف مخصّص للتحديثات

لنغلّق منطق التحديث في خُطّاف قابل لإعادة الاستخدام:

```typescript
interface UseOptimisticUpdateOptions<T> {
  onSuccess?: (item: T) => void;
  onError?: (error: Error, item: T) => void;
  retryCount?: number;
}

function useOptimisticUpdate<T extends { id: number }>(
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  updateFn: (id: number, updates: Partial<T>) => Promise<T>,
  options: UseOptimisticUpdateOptions<T> = {},
) {
  const [pendingUpdates, setPendingUpdates] = useState<Set<number>>(new Set());
  const [failedUpdates, setFailedUpdates] = useState<Map<number, Error>>(new Map());

  const update = useCallback(
    async (id: number, updates: Partial<T>) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      // Clear any previous errors
      setFailedUpdates((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });

      // Mark as pending
      setPendingUpdates((prev) => new Set(prev).add(id));

      // Apply optimistic update
      const optimisticItem = { ...item, ...updates };
      setItems((prev) => prev.map((i) => (i.id === id ? optimisticItem : i)));

      try {
        const updated = await updateFn(id, updates);

        // Apply server response
        setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));

        options.onSuccess?.(updated);
      } catch (error) {
        // Rollback
        setItems((prev) => prev.map((i) => (i.id === id ? item : i)));

        const err = error instanceof Error ? error : new Error('Update failed');
        setFailedUpdates((prev) => new Map(prev).set(id, err));

        options.onError?.(err, item);
      } finally {
        setPendingUpdates((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [items, setItems, updateFn, options],
  );

  const retry = useCallback(
    (id: number) => {
      const error = failedUpdates.get(id);
      if (error) {
        // Find the item and retry with same updates
        const item = items.find((i) => i.id === id);
        if (item) {
          // You'd need to store the original updates to retry properly
          // This is simplified
          update(id, {});
        }
      }
    },
    [failedUpdates, items, update],
  );

  return {
    update,
    retry,
    isPending: (id: number) => pendingUpdates.has(id),
    hasError: (id: number) => failedUpdates.has(id),
    getError: (id: number) => failedUpdates.get(id),
    pendingCount: pendingUpdates.size,
    errorCount: failedUpdates.size,
  };
}
```

## مثال كامل

إليك كل شيء مجتمعةً:

```typescript
function CompleteTodoUpdater() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error('Update failed');
    return response.json();
  };

  const { update, retry, isPending, hasError, getError, pendingCount, errorCount } =
    useOptimisticUpdate(todos, setTodos, updateTodo, {
      onSuccess: (todo) => console.log('Updated:', todo),
      onError: (error, todo) => console.error('Failed to update:', todo, error),
    });

  return (
    <div>
      <div className="status-bar">
        {pendingCount > 0 && <span>⏳ {pendingCount} pending</span>}
        {errorCount > 0 && <span>❌ {errorCount} failed</span>}
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => update(todo.id, { completed: !todo.completed })}
            onEdit={(title) => update(todo.id, { title })}
            isPending={isPending(todo.id)}
            hasError={hasError(todo.id)}
            error={getError(todo.id)}
            onRetry={() => retry(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}
```

## أفضل الممارسات

1. **نفّذ التراجع دائمًا** — يمكن أن تفشل طلبات الشبكة
2. **اعرض تغذية راجعة بصرية** — يحتاج المستخدمون إلى معرفة ما يحدث
3. **استخدم PATCH للتحديثات الجزئية** — أكثر كفاءة من PUT
4. **استخدم الدفعات كلما أمكن** — قلّل عدد طلبات الشبكة
5. **تعامل مع سباقات الطلبات** — ألغِ التحديثات القديمة أو تجاهلها

## الخلاصة

توفّر التحديثات المتفائلة تغذية راجعة فورية مع الحفاظ على سلامة البيانات. المفاهيم الأساسية:

- تحديثات فورية لواجهة المستخدم مع مزامنة في الخلفية
- التراجع عند الفشل
- تغذية راجعة بصرية أثناء التحديثات
- عمليات دفعية من أجل الكفاءة
- أنواع TypeScript سليمة في كل مكان

## ما التالي؟

لنُكمل عمليات CRUD بتنفيذ DELETE مع تنظيف سليم للحالة.
