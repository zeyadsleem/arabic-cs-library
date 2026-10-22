---
title: "طلبات DELETE وتنظيف الحالة"
---

يبدو حذف البيانات بسيطًا — أزله من المصفوفة واعتبر الأمر منتهيًا. لكن تطبيقات الإنتاج تحتاج إلى نوافذ تأكيد، وإمكانية التراجع (undo)، والحذف الناعم (soft delete)، وتنظيف سليم للبيانات المرتبطة. يساعدنا TypeScript على تنفيذ هذه الأنماط بأمان، ويضمن تعاملنا مع جميع الحالات الحدّية التي تصاحب العمليات المدمّرة.

## النمط الأساسي للحذف

لنبدأ بتنفيذ حذف بسيط:

```typescript
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function BasicTodoDeleter() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deleteTodo = async (todoId: number) => {
    setIsDeleting(todoId);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      // Remove from local state
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)} disabled={isDeleting === todo.id}>
              {isDeleting === todo.id ? 'Deleting...' : '🗑️'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## الحذف المتفائل مع التراجع

نفّذ حذفًا فوريًا مع إمكانية التراجع:

```typescript
interface DeletedTodo extends Todo {
  deletedAt: number;
  undoTimeout?: NodeJS.Timeout;
}

function UndoableTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<Map<number, DeletedTodo>>(new Map());
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  const UNDO_DURATION = 5000; // 5 seconds to undo

  const deleteTodo = (todoId: number) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    // Immediately remove from UI (optimistic)
    setTodos((prev) => prev.filter((t) => t.id !== todoId));

    // Store for undo
    const deletedTodo: DeletedTodo = {
      ...todo,
      deletedAt: Date.now(),
    };

    // Set timeout to permanently delete
    const timeout = setTimeout(async () => {
      await permanentlyDelete(todoId);
    }, UNDO_DURATION);

    deletedTodo.undoTimeout = timeout;

    setDeletedTodos((prev) => new Map(prev).set(todoId, deletedTodo));
  };

  const permanentlyDelete = async (todoId: number) => {
    setDeletingIds((prev) => new Set(prev).add(todoId));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      // Remove from deleted items
      setDeletedTodos((prev) => {
        const next = new Map(prev);
        next.delete(todoId);
        return next;
      });
    } catch (error) {
      // On failure, restore the todo
      const deletedTodo = deletedTodos.get(todoId);
      if (deletedTodo) {
        const { deletedAt, undoTimeout, ...todo } = deletedTodo;
        setTodos((prev) => [...prev, todo].sort((a, b) => a.id - b.id));
      }

      console.error('Delete failed:', error);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(todoId);
        return next;
      });
    }
  };

  const undoDelete = (todoId: number) => {
    const deletedTodo = deletedTodos.get(todoId);
    if (!deletedTodo) return;

    // Clear the timeout
    if (deletedTodo.undoTimeout) {
      clearTimeout(deletedTodo.undoTimeout);
    }

    // Restore the todo
    const { deletedAt, undoTimeout, ...todo } = deletedTodo;
    setTodos((prev) => [...prev, todo].sort((a, b) => a.id - b.id));

    // Remove from deleted
    setDeletedTodos((prev) => {
      const next = new Map(prev);
      next.delete(todoId);
      return next;
    });
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {deletedTodos.size > 0 && (
        <div className="undo-container">
          <h3>Recently Deleted</h3>
          {Array.from(deletedTodos.values()).map((todo) => {
            const isDeleting = deletingIds.has(todo.id);
            const timeLeft = Math.max(0, UNDO_DURATION - (Date.now() - todo.deletedAt));

            return (
              <div key={todo.id} className="undo-item">
                <span>{todo.title}</span>
                {isDeleting ? (
                  <span>Permanently deleting...</span>
                ) : (
                  <>
                    <button onClick={() => undoDelete(todo.id)}>
                      Undo ({Math.ceil(timeLeft / 1000)}s)
                    </button>
                    <button onClick={() => permanentlyDelete(todo.id)}>Delete Now</button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

## نمط نافذة التأكيد

أضف خطوة تأكيد قبل الإجراءات المدمّرة:

```typescript
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm} className={danger ? 'danger' : ''}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function TodosWithConfirmDelete() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (todo: Todo) => {
    setTodoToDelete(todo);
  };

  const confirmDelete = async () => {
    if (!todoToDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoToDelete.id}`,
        { method: 'DELETE' },
      );

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos((prev) => prev.filter((t) => t.id !== todoToDelete.id));
      setTodoToDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete todo. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setTodoToDelete(null);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteClick(todo)}>Delete</button>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        isOpen={todoToDelete !== null}
        title="Delete Todo?"
        message={`Are you sure you want to delete "${todoToDelete?.title}"? This action cannot be undone.`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Keep"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        danger
      />
    </div>
  );
}
```

## نمط الحذف الناعم

نفّذ حذفًا ناعمًا تُوسم فيه العناصر كمحذوفة دون إزالتها:

```typescript
interface SoftDeletableTodo extends Todo {
  deletedAt?: Date;
  deletedBy?: string;
}

function SoftDeleteTodos() {
  const [todos, setTodos] = useState<SoftDeletableTodo[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'deleted'>('active');

  const softDelete = async (todoId: number) => {
    // Mark as deleted locally
    const now = new Date();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, deletedAt: now, deletedBy: 'current-user' } : todo,
      ),
    );

    try {
      // Send soft delete to server
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deletedAt: now.toISOString(),
          deletedBy: 'current-user',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to soft delete');
      }
    } catch (error) {
      // Rollback on failure
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === todoId ? { ...todo, deletedAt: undefined, deletedBy: undefined } : todo,
        ),
      );

      console.error('Soft delete failed:', error);
    }
  };

  const restore = async (todoId: number) => {
    // Restore locally
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, deletedAt: undefined, deletedBy: undefined } : todo,
      ),
    );

    try {
      // Send restore to server
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deletedAt: null,
          deletedBy: null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to restore');
      }
    } catch (error) {
      // Re-mark as deleted on failure
      const todo = todos.find((t) => t.id === todoId);
      if (todo && todo.deletedAt) {
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todoId ? { ...t, deletedAt: todo.deletedAt, deletedBy: todo.deletedBy } : t,
          ),
        );
      }

      console.error('Restore failed:', error);
    }
  };

  const permanentlyDelete = async (todoId: number) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    // Remove from local state
    setTodos((prev) => prev.filter((t) => t.id !== todoId));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to permanently delete');
      }
    } catch (error) {
      // Restore on failure
      setTodos((prev) => [...prev, todo]);
      console.error('Permanent delete failed:', error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.deletedAt;
    if (filter === 'deleted') return !!todo.deletedAt;
    return true;
  });

  return (
    <div>
      <div className="filters">
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>
          Active ({todos.filter((t) => !t.deletedAt).length})
        </button>
        <button
          onClick={() => setFilter('deleted')}
          className={filter === 'deleted' ? 'active' : ''}
        >
          Deleted ({todos.filter((t) => !!t.deletedAt).length})
        </button>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          All ({todos.length})
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              opacity: todo.deletedAt ? 0.5 : 1,
              textDecoration: todo.deletedAt ? 'line-through' : 'none',
            }}
          >
            <span>{todo.title}</span>
            {todo.deletedAt ? (
              <>
                <span> (Deleted {todo.deletedAt.toLocaleDateString()})</span>
                <button onClick={() => restore(todo.id)}>Restore</button>
                <button onClick={() => permanentlyDelete(todo.id)}>Delete Forever</button>
              </>
            ) : (
              <button onClick={() => softDelete(todo.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## عمليات الحذف بالدفعات

احذف عناصر متعدّدة بكفاءة:

```typescript
function BatchDeleteTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteResults, setDeleteResults] = useState<{
    successful: number[];
    failed: number[];
  } | null>(null);

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

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;

    const idsToDelete = Array.from(selectedIds);
    setIsDeleting(true);

    // Optimistically remove from UI
    const todosToDelete = todos.filter((t) => selectedIds.has(t.id));
    setTodos((prev) => prev.filter((t) => !selectedIds.has(t.id)));

    const results = await Promise.allSettled(
      idsToDelete.map((id) =>
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'DELETE',
        }).then((res) => {
          if (!res.ok) throw new Error(`Failed to delete ${id}`);
          return id;
        }),
      ),
    );

    const successful: number[] = [];
    const failed: number[] = [];

    results.forEach((result, index) => {
      const todoId = idsToDelete[index];
      if (result.status === 'fulfilled') {
        successful.push(todoId);
      } else {
        failed.push(todoId);
      }
    });

    // Restore failed deletions
    if (failed.length > 0) {
      const failedTodos = todosToDelete.filter((t) => failed.includes(t.id));
      setTodos((prev) => [...prev, ...failedTodos].sort((a, b) => a.id - b.id));
    }

    setDeleteResults({ successful, failed });
    setIsDeleting(false);
    setSelectedIds(new Set());

    // Clear results after 5 seconds
    setTimeout(() => {
      setDeleteResults(null);
    }, 5000);
  };

  return (
    <div>
      <div className="batch-controls">
        <button onClick={selectAll}>Select All</button>
        <button onClick={deselectAll}>Clear Selection</button>
        <button
          onClick={deleteSelected}
          disabled={selectedIds.size === 0 || isDeleting}
          className="danger"
        >
          Delete Selected ({selectedIds.size})
        </button>
      </div>

      {deleteResults && (
        <div className="results">
          {deleteResults.successful.length > 0 && (
            <p>✅ Deleted {deleteResults.successful.length} todos</p>
          )}
          {deleteResults.failed.length > 0 && (
            <p>❌ Failed to delete {deleteResults.failed.length} todos</p>
          )}
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={selectedIds.has(todo.id)}
              onChange={() => toggleSelection(todo.id)}
              disabled={isDeleting}
            />
            <span
              style={{
                opacity: isDeleting && selectedIds.has(todo.id) ? 0.5 : 1,
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

## عمليات الحذف المتتالية

تعامل مع حذف البيانات المرتبطة:

```typescript
interface TodoWithSubtasks extends Todo {
  subtasks?: Subtask[];
}

interface Subtask {
  id: number;
  todoId: number;
  title: string;
  completed: boolean;
}

function CascadingDeleteTodos() {
  const [todos, setTodos] = useState<TodoWithSubtasks[]>([]);
  const [deletionProgress, setDeletionProgress] = useState<{
    todoId: number;
    message: string;
    progress: number;
    total: number;
  } | null>(null);

  const deleteTodoWithSubtasks = async (todo: TodoWithSubtasks) => {
    const subtasks = todo.subtasks || [];
    const total = subtasks.length + 1; // subtasks + main todo
    let completed = 0;

    setDeletionProgress({
      todoId: todo.id,
      message: 'Deleting subtasks...',
      progress: 0,
      total,
    });

    // Delete subtasks first
    for (const subtask of subtasks) {
      try {
        await fetch(`/api/subtasks/${subtask.id}`, { method: 'DELETE' });
        completed++;
        setDeletionProgress({
          todoId: todo.id,
          message: `Deleted ${completed} of ${subtasks.length} subtasks`,
          progress: completed,
          total,
        });
      } catch (error) {
        console.error(`Failed to delete subtask ${subtask.id}:`, error);
      }
    }

    // Then delete the main todo
    setDeletionProgress({
      todoId: todo.id,
      message: 'Deleting main todo...',
      progress: completed,
      total,
    });

    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'DELETE',
      });

      // Remove from state
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));

      setDeletionProgress({
        todoId: todo.id,
        message: 'Completed!',
        progress: total,
        total,
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setDeletionProgress({
        todoId: todo.id,
        message: 'Failed to delete main todo',
        progress: completed,
        total,
      });
    }

    // Clear progress after 2 seconds
    setTimeout(() => {
      setDeletionProgress(null);
    }, 2000);
  };

  return (
    <div>
      {deletionProgress && (
        <div className="progress-bar">
          <p>{deletionProgress.message}</p>
          <progress value={deletionProgress.progress} max={deletionProgress.total} />
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <span>{todo.title}</span>
              {todo.subtasks && todo.subtasks.length > 0 && (
                <span> ({todo.subtasks.length} subtasks)</span>
              )}
              <button
                onClick={() => deleteTodoWithSubtasks(todo)}
                disabled={deletionProgress?.todoId === todo.id}
              >
                Delete All
              </button>
            </div>
            {todo.subtasks && (
              <ul>
                {todo.subtasks.map((subtask) => (
                  <li key={subtask.id}>- {subtask.title}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## خُطّاف مخصّص لعمليات الحذف

اجمع منطق الحذف داخل خُطّاف قابل لإعادة الاستخدام:

```typescript
interface UseDeleteOptions {
  onSuccess?: (id: number) => void;
  onError?: (error: Error, id: number) => void;
  confirmation?: boolean;
  undoDuration?: number;
}

function useDelete<T extends { id: number }>(
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  deleteFn: (id: number) => Promise<void>,
  options: UseDeleteOptions = {},
) {
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [undoableDeletes, setUndoableDeletes] = useState<Map<number, T>>(new Map());

  const deleteItem = useCallback(
    async (id: number) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      if (options.undoDuration) {
        // Soft delete with undo
        setItems((prev) => prev.filter((i) => i.id !== id));
        setUndoableDeletes((prev) => new Map(prev).set(id, item));

        setTimeout(async () => {
          const stillUndoable = undoableDeletes.has(id);
          if (stillUndoable) {
            await performDelete(id);
          }
        }, options.undoDuration);
      } else {
        await performDelete(id);
      }
    },
    [items, setItems, options.undoDuration],
  );

  const performDelete = async (id: number) => {
    setDeletingIds((prev) => new Set(prev).add(id));

    try {
      await deleteFn(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setUndoableDeletes((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
      options.onSuccess?.(id);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Delete failed');
      options.onError?.(err, id);

      // Restore if it was undoable
      const item = undoableDeletes.get(id);
      if (item) {
        setItems((prev) => [...prev, item].sort((a, b) => a.id - b.id));
      }
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const undo = (id: number) => {
    const item = undoableDeletes.get(id);
    if (item) {
      setItems((prev) => [...prev, item].sort((a, b) => a.id - b.id));
      setUndoableDeletes((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return {
    deleteItem,
    undo,
    isDeleting: (id: number) => deletingIds.has(id),
    canUndo: (id: number) => undoableDeletes.has(id),
    deletingCount: deletingIds.size,
  };
}
```

## أفضل الممارسات

1. **أكّد دائمًا الإجراءات المدمّرة** — استخدم نوافذ التأكيد أو إمكانية التراجع
2. **نفّذ الحذف الناعم متى أمكن** — أبقِ البيانات قابلة للاسترجاع
3. **تعامل مع عمليات الحذف المتتالية بعناية** — نظّف البيانات المرتبطة
4. **قدّم تغذية راجعة أثناء الحذف** — اعرض التقدّم للعمليات الجماعية
5. **اختبر الحالات الحدّية** — أعطال الشبكة، والحذف المتزامن، وما شابه

## الخلاصة

تتطلّب عمليات الحذف السليمة ما يلي:

- تأكيد قبل الإجراءات المدمّرة
- إمكانية تراجع لتجربة استخدام أفضل
- أنماط حذف ناعم لاسترجاع البيانات
- عمليات بالدفعات لزيادة الكفاءة
- تنظيف سليم للحالة ومعالجة الأخطاء

## ما التالي؟

لنجمع كل ذلك معًا الآن في تطبيق مهام متكامل يعمل بعمليات CRUD.
