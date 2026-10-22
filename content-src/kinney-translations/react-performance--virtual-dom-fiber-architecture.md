---
title: "الدوم الافتراضي ومعمارية Fiber"
---

سمعت هذه العبارة ألف مرة:

> تستخدم React دومًا افتراضيًا (Virtual DOM) من أجل الأداء.

لكن عندما تُطلب التفاصيل، يلوّح معظم المطوّرين بكلام غامض عن «المقارنة» (diffing) و«تجميع التحديثات» (batching updates). والحقيقة أكثر إثارة بكثير. فمعمارية Fiber في React إعادة كتابة كاملة لخوارزمية React الأساسية، تقدّم مفاهيم مثل تقسيم الوقت (time-slicing)، وجدولة الأولويات (priority scheduling)، والتصيير القابل للمقاطعة (interruptible rendering)، وهي مفاهيم تغيّر جذريًا الطريقة التي ينبغي أن نفكّر بها في أداء React.

فهم Fiber ليس فضولًا أكاديميًا فحسب — بل يؤثّر مباشرة في كيفية كتابتك لشيفرة React عالية الأداء. فعندما تعرف كيف تجدول React العمل، وترتّب أولويات التحديثات، وتقرّر ما تصيّره ومتى، تستطيع بناء مكوّناتك وتحديثات حالتك لتعمل مع خوارزمية React لا ضدّها. يكشف هذا الغوص العميق الآليات الداخلية التي تُشغّل كل تطبيق React.

## الدوم الافتراضي: أكثر من مجرّد شعور

ليس DOM الافتراضي مجرّد تحسين للأداء — بل نموذج برمجي يتيح واجهات مستخدم تصريحية (declarative):

```typescript
// What the Virtual DOM actually is
interface VirtualNode {
  type: string | ComponentType; // 'div' or MyComponent
  props: Record<string, any>; // Including children
  key: string | null; // For list reconciliation
  ref: any; // Ref attachments
}

// Simplified Virtual DOM creation
function createElement(
  type: string | ComponentType,
  props: Record<string, any> | null,
  ...children: any[]
): VirtualNode {
  return {
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children,
    },
    key: props?.key || null,
    ref: props?.ref || null,
  };
}

// What JSX compiles to
const jsxElement = <div className="card">Hello</div>;

// Becomes:
const virtualElement = createElement('div', { className: 'card' }, 'Hello');

// Component Virtual DOM
const ComponentVDOM = createElement(
  MyComponent,
  { name: 'React' },
  createElement('span', null, 'Child'),
);
```

### عملية المطابقة

```typescript
// Simplified reconciliation algorithm
class SimpleReconciler {
  reconcile(
    oldVNode: VirtualNode | null,
    newVNode: VirtualNode | null,
    container: HTMLElement,
  ): void {
    // Deletion
    if (oldVNode && !newVNode) {
      this.removeNode(oldVNode, container);
      return;
    }

    // Addition
    if (!oldVNode && newVNode) {
      this.createNode(newVNode, container);
      return;
    }

    // Update
    if (oldVNode && newVNode) {
      // Different types: replace entirely
      if (oldVNode.type !== newVNode.type) {
        this.removeNode(oldVNode, container);
        this.createNode(newVNode, container);
        return;
      }

      // Same type: update properties and recurse on children
      this.updateNode(oldVNode, newVNode, container);
      this.reconcileChildren(oldVNode, newVNode, container);
    }
  }

  private reconcileChildren(
    oldVNode: VirtualNode,
    newVNode: VirtualNode,
    container: HTMLElement,
  ): void {
    const oldChildren = Array.isArray(oldVNode.props.children)
      ? oldVNode.props.children
      : [oldVNode.props.children];

    const newChildren = Array.isArray(newVNode.props.children)
      ? newVNode.props.children
      : [newVNode.props.children];

    // Key-based reconciliation for lists
    if (this.hasKeys(newChildren)) {
      this.reconcileKeyedChildren(oldChildren, newChildren, container);
    } else {
      // Index-based reconciliation (less efficient)
      this.reconcileIndexedChildren(oldChildren, newChildren, container);
    }
  }

  private reconcileKeyedChildren(
    oldChildren: VirtualNode[],
    newChildren: VirtualNode[],
    container: HTMLElement,
  ): void {
    // Build key maps for efficient lookup
    const oldKeyMap = new Map<string, VirtualNode>();
    oldChildren.forEach((child) => {
      if (child.key) oldKeyMap.set(child.key, child);
    });

    newChildren.forEach((newChild, index) => {
      const oldChild = oldKeyMap.get(newChild.key!);

      if (oldChild) {
        // Reuse existing node
        this.updateNode(oldChild, newChild, container);
        oldKeyMap.delete(newChild.key!);
      } else {
        // Create new node
        this.createNode(newChild, container);
      }
    });

    // Remove unused old nodes
    oldKeyMap.forEach((oldChild) => {
      this.removeNode(oldChild, container);
    });
  }
}
```

## معمارية Fiber: نقطة التحوّل

تُعيد Fiber تصوّر خوارزمية المطابقة في React كعملية تدريجية قابلة للمقاطعة:

```typescript
// Fiber node structure (simplified)
interface FiberNode {
  // Instance
  tag: WorkTag; // Component type (Function, Class, Host, etc.)
  type: any; // Component constructor or DOM tag
  stateNode: any; // DOM node or class instance

  // Props and state
  pendingProps: any; // New props
  memoizedProps: any; // Previous props
  memoizedState: any; // Current state
  updateQueue: UpdateQueue | null; // Pending state updates

  // Effects
  flags: Flags; // Side effects to perform
  subtreeFlags: Flags; // Aggregated flags from subtree
  deletions: FiberNode[] | null; // Children to delete

  // Tree structure
  return: FiberNode | null; // Parent fiber
  child: FiberNode | null; // First child
  sibling: FiberNode | null; // Next sibling
  index: number; // Position in parent

  // Work in progress
  alternate: FiberNode | null; // Double buffering

  // Time and priority
  lanes: Lanes; // Priority of this update
  childLanes: Lanes; // Priority of children
  expirationTime: number; // When this work expires
}

// Work tags identify fiber type
enum WorkTag {
  FunctionComponent = 0,
  ClassComponent = 1,
  HostRoot = 3, // Root of the tree
  HostComponent = 5, // DOM elements
  HostText = 6, // Text nodes
  Fragment = 7,
  Mode = 8,
  ContextConsumer = 9,
  ContextProvider = 10,
  ForwardRef = 11,
  Profiler = 12,
  SuspenseComponent = 13,
  MemoComponent = 14,
  SimpleMemoComponent = 15,
  LazyComponent = 16,
}

// Flags track side effects
enum Flags {
  NoFlags = 0b0000000000000000000,
  PerformedWork = 0b0000000000000000001,
  Placement = 0b0000000000000000010,
  Update = 0b0000000000000000100,
  Deletion = 0b0000000000000001000,
  ChildDeletion = 0b0000000000000010000,
  ContentReset = 0b0000000000000100000,
  Callback = 0b0000000000001000000,
  DidCapture = 0b0000000000010000000,
  Ref = 0b0000000000100000000,
  Snapshot = 0b0000000001000000000,
  Passive = 0b0000000010000000000,
  LayoutMask = Update | Callback | Ref | Snapshot,
  PassiveMask = Passive | ChildDeletion,
}
```

### حلقة عمل Fiber

```typescript
// Simplified Fiber work loop
class FiberScheduler {
  private workInProgressRoot: FiberNode | null = null;
  private workInProgress: FiberNode | null = null;
  private remainingExpirationTime: number = NoWork;
  private nextUnitOfWork: FiberNode | null = null;

  // Main work loop - can be interrupted
  workLoop(deadline: IdleDeadline): void {
    while (this.nextUnitOfWork !== null && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
      this.nextUnitOfWork = this.performUnitOfWork(this.nextUnitOfWork);
    }

    if (this.nextUnitOfWork === null) {
      // All work complete, commit to DOM
      this.completeRoot();
    } else {
      // More work to do, schedule continuation
      requestIdleCallback((deadline) => this.workLoop(deadline));
    }
  }

  // Process one fiber node
  private performUnitOfWork(fiber: FiberNode): FiberNode | null {
    // Phase 1: Begin work (traverse down)
    const next = this.beginWork(fiber);

    if (next !== null) {
      // Continue with child
      return next;
    }

    // No children, complete this fiber
    let completedWork: FiberNode | null = fiber;

    while (completedWork !== null) {
      // Phase 2: Complete work (traverse up)
      const returnFiber = completedWork.return;
      const siblingFiber = completedWork.sibling;

      this.completeWork(completedWork);

      if (siblingFiber !== null) {
        // Continue with sibling
        return siblingFiber;
      }

      // Continue completing parent
      completedWork = returnFiber;
    }

    return null;
  }

  private beginWork(fiber: FiberNode): FiberNode | null {
    switch (fiber.tag) {
      case WorkTag.FunctionComponent:
        return this.updateFunctionComponent(fiber);

      case WorkTag.ClassComponent:
        return this.updateClassComponent(fiber);

      case WorkTag.HostComponent:
        return this.updateHostComponent(fiber);

      case WorkTag.SuspenseComponent:
        return this.updateSuspenseComponent(fiber);

      default:
        return null;
    }
  }

  private updateFunctionComponent(fiber: FiberNode): FiberNode | null {
    const Component = fiber.type;
    const props = fiber.pendingProps;

    // Call the function component
    const children = Component(props);

    // Reconcile children
    return this.reconcileChildren(fiber, children);
  }

  private completeWork(fiber: FiberNode): void {
    // Mark effects that need to be applied
    if (fiber.flags & Flags.Update) {
      this.markUpdate(fiber);
    }

    if (fiber.flags & Flags.Placement) {
      this.markPlacement(fiber);
    }

    if (fiber.flags & Flags.Deletion) {
      this.markDeletion(fiber);
    }

    // Bubble up effects to parent
    if (fiber.return !== null) {
      fiber.return.flags |= fiber.flags;
      fiber.return.subtreeFlags |= fiber.subtreeFlags;
    }
  }

  // Commit phase - apply all effects to DOM
  private completeRoot(): void {
    const finishedWork = this.workInProgressRoot;
    if (finishedWork === null) return;

    // Commit all effects
    this.commitRoot(finishedWork);

    // Reset for next update
    this.workInProgressRoot = null;
    this.workInProgress = null;
  }

  private commitRoot(root: FiberNode): void {
    // Phase 1: Before mutation (getSnapshotBeforeUpdate)
    this.commitBeforeMutationEffects(root);

    // Phase 2: Mutation (DOM updates)
    this.commitMutationEffects(root);

    // Swap the tree
    root.current = root.alternate;

    // Phase 3: Layout (componentDidMount/Update)
    this.commitLayoutEffects(root);
  }
}
```

## الأولوية والجدولة

تقدّم Fiber جدولة قائمة على الأولوية لتضمن ألا تعيق الأعمال منخفضة الأولوية التحديثات عالية الأولوية (مثل إدخال المستخدم):

```typescript
// Priority levels in React
enum Lane {
  NoLane = 0b0000000000000000000000000000000,
  SyncLane = 0b0000000000000000000000000000001,
  InputContinuousLane = 0b0000000000000000000000000000100,
  DefaultLane = 0b0000000000000000000000000010000,
  TransitionLane1 = 0b0000000000000000000000001000000,
  TransitionLane2 = 0b0000000000000000000000010000000,
  IdleLane = 0b0100000000000000000000000000000,
  OffscreenLane = 0b1000000000000000000000000000000,
}

// Priority scheduler
class PriorityScheduler {
  private taskQueue: Task[] = [];
  private timerQueue: Task[] = [];
  private currentTask: Task | null = null;
  private isPerformingWork = false;

  scheduleCallback(priority: Priority, callback: () => void, options?: { delay?: number }): Task {
    const currentTime = performance.now();
    const startTime = currentTime + (options?.delay || 0);

    // Calculate timeout based on priority
    const timeout = this.timeoutForPriority(priority);
    const expirationTime = startTime + timeout;

    const task: Task = {
      id: this.nextTaskId++,
      callback,
      priority,
      startTime,
      expirationTime,
      sortIndex: -1,
    };

    if (startTime > currentTime) {
      // Delayed task
      task.sortIndex = startTime;
      this.push(this.timerQueue, task);

      if (this.taskQueue.length === 0 && task === this.peek(this.timerQueue)) {
        this.requestHostTimeout(this.handleTimeout, startTime - currentTime);
      }
    } else {
      // Immediate task
      task.sortIndex = expirationTime;
      this.push(this.taskQueue, task);

      if (!this.isPerformingWork) {
        this.isPerformingWork = true;
        this.requestHostCallback(this.flushWork);
      }
    }

    return task;
  }

  private timeoutForPriority(priority: Priority): number {
    switch (priority) {
      case Priority.Immediate:
        return -1; // IMMEDIATE_PRIORITY_TIMEOUT
      case Priority.UserBlocking:
        return 250; // USER_BLOCKING_PRIORITY_TIMEOUT
      case Priority.Normal:
        return 5000; // NORMAL_PRIORITY_TIMEOUT
      case Priority.Low:
        return 10000; // LOW_PRIORITY_TIMEOUT
      case Priority.Idle:
        return 1073741823; // IDLE_PRIORITY_TIMEOUT (never expires)
      default:
        return 5000;
    }
  }

  private flushWork(hasTimeRemaining: boolean, initialTime: number): boolean {
    this.isPerformingWork = true;

    try {
      return this.workLoop(hasTimeRemaining, initialTime);
    } finally {
      this.currentTask = null;
      this.isPerformingWork = false;
    }
  }

  private workLoop(hasTimeRemaining: boolean, initialTime: number): boolean {
    let currentTime = initialTime;
    this.advanceTimers(currentTime);

    this.currentTask = this.peek(this.taskQueue);

    while (this.currentTask !== null) {
      if (
        this.currentTask.expirationTime > currentTime &&
        (!hasTimeRemaining || this.shouldYieldToHost())
      ) {
        // This task hasn't expired, and we've run out of time
        break;
      }

      const callback = this.currentTask.callback;

      if (typeof callback === 'function') {
        this.currentTask.callback = null;
        const continuationCallback = callback();

        if (typeof continuationCallback === 'function') {
          // Task wants to continue
          this.currentTask.callback = continuationCallback;
        } else {
          // Task complete
          if (this.currentTask === this.peek(this.taskQueue)) {
            this.pop(this.taskQueue);
          }
        }
      } else {
        this.pop(this.taskQueue);
      }

      this.currentTask = this.peek(this.taskQueue);
      currentTime = performance.now();
    }

    // Return whether there's more work
    return this.currentTask !== null;
  }

  private shouldYieldToHost(): boolean {
    const currentTime = performance.now();
    return currentTime >= this.deadline;
  }

  // Min-heap operations for priority queue
  private push(heap: Task[], task: Task): void {
    const index = heap.length;
    heap.push(task);
    this.siftUp(heap, task, index);
  }

  private peek(heap: Task[]): Task | null {
    return heap.length === 0 ? null : heap[0];
  }

  private pop(heap: Task[]): Task | null {
    if (heap.length === 0) return null;

    const first = heap[0];
    const last = heap.pop()!;

    if (last !== first) {
      heap[0] = last;
      this.siftDown(heap, last, 0);
    }

    return first;
  }
}
```

## ميزات الوضع المتزامن (Concurrent Mode)

يستفيد الوضع المتزامن من معمارية Fiber لتمكين ميزات قوية:

```typescript
// Time Slicing Example
function TimeSlicingDemo() {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // High priority - immediate update
    setInputValue(e.target.value);

    // Low priority - can be interrupted
    startTransition(() => {
      const newList = [];
      for (let i = 0; i < 20000; i++) {
        newList.push(e.target.value);
      }
      setList(newList);
    });
  };

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      {isPending && <span>Updating list...</span>}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Suspense with Fiber
function SuspenseWithFiber() {
  // Fiber can pause rendering when a promise is thrown
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent />
    </Suspense>
  );
}

function AsyncComponent() {
  const data = use(fetchData()); // Throws promise if not ready

  // Fiber will:
  // 1. Catch the promise
  // 2. Show fallback
  // 3. Resume rendering when promise resolves
  return <div>{data}</div>;
}
```

## كيف تؤثّر Fiber في الأداء

### التجميع والتجميع التلقائي

```typescript
// React 18+ automatic batching
function AutoBatchingExample() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // Before React 18: 2 renders
  // React 18+: 1 render (automatic batching)
  const handleClick = () => {
    setCount((c) => c + 1);
    setFlag((f) => !f);
    // Both updates batched automatically
  };

  // Even in async code!
  const handleAsyncClick = async () => {
    const data = await fetchData();

    // Still batched in React 18+
    setCount(data.count);
    setFlag(data.flag);
  };

  // Opt out of batching when needed
  const handleImmediateUpdate = () => {
    flushSync(() => {
      setCount((c) => c + 1);
    }); // Forces immediate render

    // This runs after count is updated
    setFlag((f) => !f);
  };

  return (
    <div>
      <p>
        Count: {count}, Flag: {flag.toString()}
      </p>
      <button onClick={handleClick}>Update Both</button>
    </div>
  );
}
```

### التحسين من أجل خوارزمية Fiber

```typescript
// Component structured for Fiber optimization
function FiberOptimizedComponent({ data }: { data: Item[] }) {
  // 1. Stable keys for efficient reconciliation
  const items = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        key: item.id, // Stable key
      })),
    [data],
  );

  // 2. Priority-aware updates
  const [search, setSearch] = useState('');
  const [deferredSearch] = useDeferredValue(search);

  // 3. Interrupt-friendly expensive computation
  const filtered = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(deferredSearch.toLowerCase())),
    [items, deferredSearch],
  );

  // 4. Leverage suspense for data fetching
  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search (high priority)"
      />

      <Suspense fallback={<Skeleton />}>
        <ItemList items={filtered} />
      </Suspense>
    </div>
  );
}

// Understanding bailout optimization
function BailoutOptimization({ value }: { value: number }) {
  console.log('Parent render');

  // Fiber can skip rendering children if props haven't changed
  return (
    <>
      <ExpensiveChild /> {/* Skipped if no props change */}
      <CheapChild value={value} />
    </>
  );
}

const ExpensiveChild = memo(() => {
  console.log('ExpensiveChild render');
  // Complex computation...
  return <div>Expensive</div>;
});
```

## تنقيح داخلية Fiber

```typescript
// Accessing Fiber internals (development only)
function FiberDebugger({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Access fiber node
      const fiberNode =
        (ref.current as any)?._reactInternalFiber || (ref.current as any)?._reactInternalInstance;

      if (fiberNode) {
        console.group('Fiber Node Structure');
        console.log('Type:', fiberNode.type);
        console.log('Tag:', fiberNode.tag);
        console.log('Props:', fiberNode.memoizedProps);
        console.log('State:', fiberNode.memoizedState);
        console.log('Effects:', fiberNode.flags);
        console.log('Priority:', fiberNode.lanes);
        console.groupEnd();

        // Traverse fiber tree
        traverseFiberTree(fiberNode);
      }
    }
  }, []);

  return <div ref={ref}>{children}</div>;
}

function traverseFiberTree(fiber: any, depth = 0) {
  const indent = '  '.repeat(depth);
  console.log(`${indent}${fiber.type?.name || fiber.type || 'Unknown'}`);

  // Traverse children
  let child = fiber.child;
  while (child) {
    traverseFiberTree(child, depth + 1);
    child = child.sibling;
  }
}

// Performance marks for Fiber phases
function measureFiberPhases() {
  if (typeof window !== 'undefined' && window.performance) {
    // React adds marks during rendering
    const marks = performance.getEntriesByType('mark');
    const reactMarks = marks.filter(
      (mark) => mark.name.startsWith('⚛') || mark.name.includes('React'),
    );

    console.table(
      reactMarks.map((mark) => ({
        name: mark.name,
        startTime: mark.startTime,
        duration: mark.duration,
      })),
    );
  }
}
```

## تحسينات عملية باستخدام Fiber

```typescript
// 1. Structure components for efficient reconciliation
function EfficientList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map((item) => (
        // Stable key = efficient reconciliation
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}

// 2. Use lanes for priority
function PriorityAwareComponent() {
  const [urgent, setUrgent] = useState('');
  const [deferred, setDeferred] = useState('');

  return (
    <div>
      <input
        value={urgent}
        onChange={(e) => {
          // Sync lane - highest priority
          setUrgent(e.target.value);
        }}
      />

      <button
        onClick={() => {
          // Transition lane - lower priority
          startTransition(() => {
            setDeferred(processData(urgent));
          });
        }}
      >
        Process
      </button>
    </div>
  );
}

// 3. Minimize fiber tree depth
// ❌ Deep nesting = more fiber nodes
function DeepNesting() {
  return (
    <div>
      <div>
        <div>
          <div>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Flat structure = fewer fiber nodes
function FlatStructure() {
  return (
    <div className="container">
      <Content />
    </div>
  );
}

// 4. Leverage Suspense boundaries
function SuspenseBoundaries() {
  return (
    <div>
      {/* Each boundary can work independently */}
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <Suspense fallback={<ContentSkeleton />}>
        <Content />
      </Suspense>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
```

## الختام

يمثّل DOM الافتراضي ومعمارية Fiber القلب النابض لقصة أداء React. فـ DOM الافتراضي يوفّر النموذج البرمجي التصريحي الذي نحبّه، بينما تحوّل Fiber ذلك النموذج إلى آلة تصيير كفؤة قابلة للمقاطعة وواعية بالأولويات. وفهم هذه الآليات الداخلية ليس أمرًا أكاديميًا فحسب — بل يوجّه مباشرة كيفية بناء مكوّناتك وإدارتك للحالة وتحسينك للأداء.

الرؤى الجوهرية: تستطيع React مقاطعة العمل واستئنافه، وللتحديثات المختلفة أولويات مختلفة، وتُكافئ خوارزمية المطابقة المفاتيح الثابتة وأشجار المكوّنات المسطّحة. اكتب شيفرة React لديك واضعًا هذه المبادئ في الحسبان، وستعمل مع الاتجاه الطبيعي للإطار لا ضدّه.

## المتطلّبات المسبقة

- فهم متين لأساسيات React
- معرفة بحلقة أحداث المتصفّح (event loop) والخيط الرئيسي
- خبرة بمفاهيم تحسين أداء React
- فهم أساسي لخوارزميات علم الحاسوب

## أمثلة عملية

معرفة المعمارية مطبّقة على سيناريوهات حقيقية:

- **جداول بيانات كبيرة** - مطابقة كفؤة بمفاتيح ثابتة
- **واجهات مليئة بالحركات** - جدولة بالأولوية لتفاعلات سلسة
- **تطبيقات الويب التقدّمية** - تقسيم الوقت لتحميل سريع الاستجابة
- **لوحات معلومات آنية** - تحديثات متزامنة بلا إعاقة

أتقن النموذج الذهني لـ Fiber، وستكتب تطبيقات React ليست سريعة فحسب — بل سريعة بشكل متوقّع، تتعامل بسلاسة مع كل شيء من الحركات الناعمة إلى القوائم الضخمة دون أي عناء.
