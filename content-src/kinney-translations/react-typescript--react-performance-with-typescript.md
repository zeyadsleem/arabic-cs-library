---
title: "أداء React مع TypeScript"
---

TypeScript ليس أداةً لالتقاط الأخطاء في وقت التجميع فحسب — بل هو أيضًا أداة قوية بشكل مفاجئ لترميز عقود الأداء في تطبيقات React لديك. وحين تستخدم الأنواع لجعل حدود الأداء صريحة، فإنّك تحوّل الأداء من تخمينٍ في وقت التشغيل إلى قرارٍ في وقت التصميم. وسنستكشف كيف يمكن للتحديد المدروس للأنواع أن يوجّه حدود memo ويمنع إعادة التصيير غير الضرورية، ويساعدك على بناء مكوّنات سريعة وقابلة للصيانة في آنٍ واحد، ويوفّر مراقبة أداء آمنة الأنواع.

والسرّ في هذا كلّه هو استخدام نظام أنواع TypeScript لجعل نوايا الأداء صريحة بدل أن تكون ضمنيّة. فبدلًا من تضييق أصابعك ورجاء أن يعمل React.memo كما هو متوقّع، يمكنك تصميم أنواع تجعل كسر تحسينات أداءك عن طريق الخطأ أمرًا مستحيلًا.

## المشكلة: الأداء بالأمل

لنبدأ بسيناريو شائع يبدو بريئًا لكنّه يخفي ألغامًا في الأداء:

```typescript
// ❌ This looks fine but has hidden performance issues
interface UserProfileProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    preferences: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
  onUpdate: (user: any) => void;
}

const UserProfile = React.memo(({ user, onUpdate }: UserProfileProps) => {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <button onClick={() => onUpdate({ ...user, lastSeen: Date.now() })}>Update Last Seen</button>
    </div>
  );
});
```

سينعاد تصيير هذا المكوّن في كل مرّة يُعاد فيها تصيير المكوّن الأب، رغم أنّنا لففناه بـ `React.memo`. ولماذا؟ لأنّ دالة `onUpdate` يُرجَّح أنّها تُنشأ من جديد في كل تصيير، ونوع `any` ذاك لا يساعدنا البتّة في فهم أي البيانات تهمّ هذا المكوّن فعلًا.

## الحلّ 1: حدود memo المبنيّة على الهوية

النمط الأول هو استخدام الأنواع لترميز الخصائص التي تهمّ التصيير فعلًا. فبدلًا من رجاء أن يكتشف `React.memo` ذلك بنفسه، نجعل عقد الأداء صريحًا:

```typescript
// ✅ Types that encode memo boundaries
interface UserProfileData {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}

interface UserProfileActions {
  readonly onUpdateLastSeen: (userId: string) => void;
}

interface UserProfileProps extends UserProfileData, UserProfileActions {}

const UserProfile = React.memo(
  ({ id, name, avatar, onUpdateLastSeen }: UserProfileProps) => {
    return (
      <div>
        <img src={avatar} alt={name} />
        <h2>{name}</h2>
        <button onClick={() => onUpdateLastSeen(id)}>Update Last Seen</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only the data props matter for rendering
    return (
      prevProps.id === nextProps.id &&
      prevProps.name === nextProps.name &&
      prevProps.avatar === nextProps.avatar
    );
  },
);
```

لقد فصلنا الآن بياناتنا عن أفعالنا، وجعلنا واضحًا الخصائص التي تؤثّر فعليًا في التصيير. وتشير مُعدِّلات `readonly` إلى أنّ هذه القيم لا ينبغي أن تتغيّر بصورة غير متوقّعة، ودالة المقارنة المخصّصة لدينا لا تفحص إلّا الخصائص المهمة للتصيير.

> **تلميح**
>
> استخدم واجهات منفصلة للبيانات والأفعال. خصائص البيانات تؤثّر في التصيير؛ أمّا خصائص الأفعال فعادةً لا تؤثّر (بافتراض أنّها مراجع ثابتة).

## الحلّ 2: أنواع المراجع الثابتة

إليك نمطًا وجدتُه بالغ الفائدة: ترميز ثبات المرجع مباشرةً في نظام الأنواع.

```typescript
// ✅ Types that enforce stable references
type StableCallback<T extends any[], R> = {
  readonly _brand: 'stable';
} & ((...args: T) => R);

// Type-level function to mark callbacks as stable
function useStableCallback<T extends any[], R>(
  callback: (...args: T) => R,
  deps: React.DependencyList,
): StableCallback<T, R> {
  return React.useCallback(callback, deps) as StableCallback<T, R>;
}

interface UserListProps {
  users: readonly UserProfileData[];
  onUserUpdate: StableCallback<[string], void>;
  onUserDelete: StableCallback<[string], void>;
}

const UserList = React.memo(({ users, onUserUpdate, onUserDelete }: UserListProps) => {
  return (
    <div>
      {users.map((user) => (
        <UserProfile key={user.id} {...user} onUpdateLastSeen={onUserUpdate} />
      ))}
    </div>
  );
});

// Usage in parent component
function UserDashboard() {
  const [users, setUsers] = useState<UserProfileData[]>([]);

  // TypeScript enforces that we use useStableCallback
  const handleUserUpdate = useStableCallback((userId: string) => {
    // Update logic here
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, lastSeen: Date.now() } : user)),
    );
  }, []);

  const handleUserDelete = useStableCallback((userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  return <UserList users={users} onUserUpdate={handleUserUpdate} onUserDelete={handleUserDelete} />;
}
```

نوع `StableCallback` يعمل كعقدٍ في وقت التجميع: أي دالة موسومة بهذا النوع تَعِد بمرجع ثابت. ولا يمكنك تمرير دالة غير ثابتة عن طريق الخطأ من دون أن يشتكي TypeScript.

## الحلّ 3: عقود البيانات للقراءة فقط

من أكبر مصادر مشكلات الأداء هو التعديل العَرَضي على بيانات ينبغي أن تكون غير قابلة للتغيير. يمكن لمُعدِّلات `readonly` في TypeScript أن تساعد، لكنّنا يمكننا أن نذهب أبعد من ذلك:

```typescript
// ✅ Deep readonly types for performance contracts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface UserState {
  users: User[];
  filters: {
    status: 'active' | 'inactive';
    department: string[];
  };
}

// This prevents any accidental mutations
type ReadonlyUserState = DeepReadonly<UserState>;

interface UserTableProps {
  data: ReadonlyUserState;
  onDataChange: StableCallback<[ReadonlyUserState], void>;
}

const UserTable = React.memo(({ data, onDataChange }: UserTableProps) => {
  // TypeScript prevents us from accidentally mutating data
  // data.users.push(newUser); // ❌ Compile error!

  const handleAddUser = (newUser: User) => {
    // We're forced to create new objects, which is memo-friendly
    onDataChange({
      ...data,
      users: [...data.users, newUser],
    });
  };

  return (
    // Table implementation
    <table>{/* Table rows */}</table>
  );
});
```

باستخدام `DeepReadonly` نجعل عدم القابلية للتغيير عقدًا في وقت التجميع بدل أن يكون أملًا في وقت التشغيل. وهذا يمنع خلل الأداء الكلاسيكي الذي يغيّر فيه أحدهم خاصية (prop) عن طريق الخطأ فيسبّب إعادة تصيير غير ضرورية.

## الحلّ 4: أنواع القيم المحسوبة

أحيانًا تريد تمرير بيانات مشتقّة إلى المكوّنات، لكنّك تريد التأكّد من أنّ هذا الاشتقاق مُخزَّن مؤقتًا. وإليك نمطًا لترميز ذلك العقد في الأنواع:

```typescript
// ✅ Types for memoized computations
type MemoizedValue<T> = {
  readonly _memoized: true;
} & T;

function useMemoizedValue<T>(factory: () => T, deps: React.DependencyList): MemoizedValue<T> {
  return React.useMemo(factory, deps) as MemoizedValue<T>;
}

interface UserStatsProps {
  stats: MemoizedValue<{
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    averageAge: number;
  }>;
}

const UserStats = React.memo(({ stats }: UserStatsProps) => {
  return (
    <div className="stats-grid">
      <div>Total: {stats.totalUsers}</div>
      <div>Active: {stats.activeUsers}</div>
      <div>Inactive: {stats.inactiveUsers}</div>
      <div>Avg Age: {Math.round(stats.averageAge)}</div>
    </div>
  );
});

// Usage
function UserDashboard({ users }: { users: User[] }) {
  const stats = useMemoizedValue(
    () => ({
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.status === 'active').length,
      inactiveUsers: users.filter((u) => u.status === 'inactive').length,
      averageAge: users.reduce((sum, u) => sum + u.age, 0) / users.length || 0,
    }),
    [users],
  );

  return <UserStats stats={stats} />;
}
```

يضمن نوع `MemoizedValue` أن تكون أي قيم محسوبة مكلفة قد خُزِّنت مؤقتًا على نحو صحيح قبل تمريرها إلى المكوّنات. وإذا حاول أحدهم تمرير قيمة محسوبة غير مخزَّنة مؤقتًا، فسيكتشف TypeScript ذلك.

## مراقبة أداء آمنة الأنواع

يمكنك إنشاء مراقبة أداء آمنة الأنواع لالتقاط حالات التراجع:

```typescript
// ✅ Typed performance monitoring hook
interface PerformanceMetrics {
  readonly renderTime: number;
  readonly updateCount: number;
  readonly lastUpdate: number;
}

function usePerformanceMonitor(componentName: string): PerformanceMetrics {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current += 1;
    const now = performance.now();
    const renderTime = now - lastRenderTimeRef.current;

    if (renderTime > 16) {
      // Slower than 60fps
      console.warn(
        `${componentName} render took ${renderTime.toFixed(2)}ms ` +
          `(render #${renderCountRef.current})`,
      );
    }

    lastRenderTimeRef.current = now;
  });

  return {
    renderTime: performance.now() - lastRenderTimeRef.current,
    updateCount: renderCountRef.current,
    lastUpdate: lastRenderTimeRef.current,
  };
}

// ✅ Usage in components
function ExpensiveComponent({ data }: { data: ComplexData[] }) {
  const metrics = usePerformanceMonitor('ExpensiveComponent');

  // Your component logic...

  return (
    <div>
      {/* Your UI */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ fontSize: '10px', color: 'gray' }}>
          Renders: {metrics.updateCount}, Last: {metrics.renderTime.toFixed(1)}ms
        </div>
      )}
    </div>
  );
}
```

## إنشاء مراجع ثابتة بالأنواع

الخطوة الأولى نحو الأداء هي ضمان استقرار المراجع. ويمكن لـ TypeScript أن يساعدنا في التقاط الأنماط غير المستقرة قبل أن تتحوّل إلى مشكلات أداء.

### ثوابت ومصانع مُنمَّطة

بدلًا من إنشاء الكائنات داخل المكوّن، أنشئها خارج المكوّن أو استخدم تخزينًا مؤقتًا (memoization) على نحو صحيح:

```typescript
// ✅ Stable reference - created once
const DEFAULT_SETTINGS = {
  theme: 'dark' as const,
  notifications: true,
} as const;

// ✅ Or use a factory with proper typing
type CreateSettingsOptions = {
  theme: 'light' | 'dark';
  notifications: boolean;
};

const createUserSettings = (options: CreateSettingsOptions) => ({
  ...DEFAULT_SETTINGS,
  ...options,
});

function UserProfile({ userId }: { userId: string }) {
  const [users, setUsers] = useState<User[]>([]);

  // ✅ Memoized with proper dependency tracking
  const userSettings = useMemo(
    () => createUserSettings({ theme: 'dark', notifications: true }),
    [], // No dependencies = stable reference
  );

  // ✅ Stable callback with useCallback
  const handleSettingsChange = useCallback((key: keyof CreateSettingsOptions, value: boolean) => {
    // Update settings logic
  }, []);

  return (
    <UserCard
      user={users.find((u) => u.id === userId)}
      settings={userSettings}
      onSettingsChange={handleSettingsChange}
    />
  );
}
```

### أنماط الاستدعاء الآمنة الأنواع

أحد الأنماط الشائعة هو إنشاء مصانع استدعاء (callback factories) مُنمَّطة لضمان استقرار المراجع:

```typescript
type CallbackFactory<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Return
    ? (...args: Args) => Return
    : never;
};

const createStableCallbacks = <T extends Record<string, Function>>(
  callbacks: T,
  deps: readonly unknown[],
): CallbackFactory<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => callbacks, deps) as CallbackFactory<T>;
};

// Usage:
function TodoList({ todos }: { todos: Todo[] }) {
  const callbacks = createStableCallbacks(
    {
      onToggle: (id: string) => {
        // Toggle logic
      },
      onDelete: (id: string) => {
        // Delete logic
      },
      onEdit: (id: string, text: string) => {
        // Edit logic
      },
    },
    [],
  ); // Only recreate if dependencies change

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...callbacks} />
      ))}
    </div>
  );
}
```

## مُحدِّدات مُنمَّطة لإعادة تصيير دقيقة

من أكبر مكاسب الأداء تأتي من استخدام مُحدِّدات لا تسبّب إعادة التصيير إلّا حين تتغيّر البيانات ذات الصلة فعلًا. وإليك كيفية إنشاء مُحدِّدات آمنة الأنواع:

```typescript
// ✅ Generic selector hook with proper typing
function useSelector<TState, TResult>(
  selector: (state: TState) => TResult,
  equalityFn?: (a: TResult, b: TResult) => boolean,
) {
  const [state, setState] = useState<TState>(() => getInitialState());

  return useMemo(
    () => selector(state),
    [state, selector], // Runs when state or selector changes
  );
}

// ✅ Memoized selectors prevent unnecessary recalculations
const selectUserById = (userId: string) =>
  useMemo(() => (state: AppState) => state.users.find((user) => user.id === userId), [userId]);

const selectUserProjects = (userId: string) =>
  useMemo(
    () => (state: AppState) => state.projects.filter((project) => project.ownerId === userId),
    [userId],
  );

// Usage in component:
function UserDashboard({ userId }: { userId: string }) {
  const userSelector = selectUserById(userId);
  const projectsSelector = selectUserProjects(userId);

  const user = useSelector(userSelector);
  const projects = useSelector(projectsSelector);

  // Only re-renders when this specific user or their projects change
  return (
    <div>
      <UserCard user={user} />
      <ProjectsList projects={projects} />
    </div>
  );
}
```

## مثال من العالم الحقيقي: شبكة بيانات مُنمَّطة للأداء

لنجمع كل ذلك معًا في مثال واقعي — مكوّن شبكة بيانات سريع وآمن الأنواع في آنٍ واحد:

```typescript
// Core data types
interface GridRow {
  readonly id: string;
  readonly data: Record<string, any>;
}

interface GridColumn {
  readonly id: string;
  readonly header: string;
  readonly accessor: string;
  readonly sortable?: boolean;
}

// Performance-oriented prop types
interface DataGridProps {
  // Data should be readonly to prevent accidental mutations
  rows: readonly GridRow[];
  columns: readonly GridColumn[];

  // Memoized computed values
  sortedRows: MemoizedValue<readonly GridRow[]>;
  visibleColumns: MemoizedValue<readonly GridColumn[]>;

  // Stable callbacks
  onRowClick: StableCallback<[string], void>;
  onSort: StableCallback<[string, 'asc' | 'desc'], void>;

  // Performance hints
  virtualizeRows?: boolean;
  rowHeight: number;
}

const DataGrid = React.memo(
  ({
    rows,
    columns,
    sortedRows,
    visibleColumns,
    onRowClick,
    onSort,
    virtualizeRows = false,
    rowHeight,
  }: DataGridProps) => {
    // Component implementation here
    return (
      <div className="data-grid">
        {/* Header */}
        <div className="grid-header">
          {visibleColumns.map((column) => (
            <GridHeader key={column.id} column={column} onSort={onSort} />
          ))}
        </div>

        {/* Body */}
        <div className="grid-body">
          {sortedRows.map((row) => (
            <GridRow key={row.id} row={row} columns={visibleColumns} onRowClick={onRowClick} />
          ))}
        </div>
      </div>
    );
  },
);

// Usage with proper typing
function UserDataGridContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' }>({
    column: 'name',
    direction: 'asc',
  });

  const columns: readonly GridColumn[] = [
    { id: 'name', header: 'Name', accessor: 'name', sortable: true },
    { id: 'email', header: 'Email', accessor: 'email', sortable: true },
    { id: 'status', header: 'Status', accessor: 'status', sortable: true },
  ];

  const rows: readonly GridRow[] = users.map((user) => ({
    id: user.id,
    data: user,
  }));

  const sortedRows = useMemoizedValue(() => {
    return [...rows].sort((a, b) => {
      const aValue = a.data[sortConfig.column];
      const bValue = b.data[sortConfig.column];

      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [rows, sortConfig]);

  const visibleColumns = useMemoizedValue(() => columns, [columns]);

  const handleRowClick = useStableCallback((rowId: string) => {
    console.log('Row clicked:', rowId);
  }, []);

  const handleSort = useStableCallback((column: string, direction: 'asc' | 'desc') => {
    setSortConfig({ column, direction });
  }, []);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sortedRows={sortedRows}
      visibleColumns={visibleColumns}
      onRowClick={handleRowClick}
      onSort={handleSort}
      rowHeight={48}
    />
  );
}
```

## مفاضلات الأداء ومتى تستخدم هذه الأنماط

هذه الأنماط ليست مجّانية — فهي تضيف تعقيدًا في الأنواع وبعض الحمل الزائد في وقت التشغيل بسبب أدوات فحص الأنواع. وإليك متى يكون كل نمط منطقيًا:

**حدود memo المبنيّة على الهوية**: استخدمها عندما تكون لديك مكوّنات يُعاد تصييرها كثيرًا بخصائص متشابهة. ويعود تعقيد الأنواع بالفائدة عندما تكون لديك كائنات خصائص معقّدة لا يؤثّر في التصيير إلّا بعض خصائصها.

**أنواع المراجع الثابتة**: ضرورية للمكوّنات التي تُمرَّر كأبناء أو ضمن أنماط خصائص التصيير. ويمنع نمط `StableCallback` إعادة التصيير العَرَضية في أشجار المكوّنات المتداخلة بعمق.

**عقود البيانات للقراءة فقط**: الأكثر قيمة في التطبيقات التي تحتوي على إدارة حالة معقّدة وتكثر فيها التعديلات العَرَضية. ويمنع نوع `DeepReadonly` فئات كاملة من أخطاء الأداء.

**أنواع القيم المحسوبة**: تستحقّ العناء في الحسابات المكلفة التي تُمرَّر إلى عدّة مكوّنات. ويضمن نوع `MemoizedValue` ألّا تتكرّر الحسابات المكلفة عن طريق الخطأ.

> **تحذير**
>
> لا تفرط في هندسة التعقيد. هذه الأنماط أكثرها قيمة في المكوّنات الحرجة للأداء أو عند العمل مع مجموعات بيانات كبيرة. أمّا المكوّنات البسيطة التي نادرًا ما تُصيَّر فقد لا يستحقّ التعقيدُ الإضافي.

## الأنماط المضادة الشائعة (وكيفية إصلاحها)

### النمط المضاد 1: كائنات الخصائص المضمّنة

```typescript
// ❌ Bad: New object on every render
function ParentComponent() {
  return (
    <ChildComponent config={{ theme: 'dark', size: 'large' }} style={{ padding: 16, margin: 8 }} />
  );
}

// ✅ Good: Stable references
const DEFAULT_CONFIG = { theme: 'dark', size: 'large' } as const;
const DEFAULT_STYLE = { padding: 16, margin: 8 } as const;

function ParentComponent() {
  return <ChildComponent config={DEFAULT_CONFIG} style={DEFAULT_STYLE} />;
}
```

### النمط المضاد 2: اعتماديات غير ثابتة في التأثيرات

```typescript
// ❌ Bad: Effect runs on every render due to unstable dependency
function UserComponent({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId, setUser]); // setUser is unstable!

  return <div>{user?.name}</div>;
}

// ✅ Good: Remove unstable dependencies
function UserComponent({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Only userId dependency

  return <div>{user?.name}</div>;
}
```

### النمط المضاد 3: التحسين المبكّر

```typescript
// ❌ Bad: Memoizing everything without measuring
function SimpleComponent({ name }: { name: string }) {
  const memoizedName = useMemo(() => name.toUpperCase(), [name]);
  const memoizedStyle = useMemo(() => ({ color: 'blue' }), []);
  const memoizedCallback = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div style={memoizedStyle}>
      {memoizedName}
      <button onClick={memoizedCallback}>Click</button>
    </div>
  );
}

// ✅ Good: Only memoize when it provides value
function SimpleComponent({ name }: { name: string }) {
  // Simple transformations don't need memoization
  const displayName = name.toUpperCase();

  return (
    <div style={{ color: 'blue' }}>
      {displayName}
      <button onClick={() => console.log('clicked')}>Click</button>
    </div>
  );
}
```

> **تلميح**
>
> قِس أولًا ثم حسّن ثانيًا. ليس كل مكوّن يحتاج إلى تخزين مؤقت — ركّز على المكوّنات التي يُعاد تصييرها كثيرًا أو التي تنفّذ عمليات مكلفة.

## الخطوات التالية

أنماط الأداء المستنيرة إلى الأنواع تحوّل TypeScript من أداة لالتقاط الأخطاء إلى دليلٍ لهندسة الأداء. وبترميز عقود الأداء في أنماطك، تجعل مشكلات الأداء ظاهرةً في وقت التجميع بدلًا من اكتشافها عبر التنميط (profiling) والتنقيح.

والفكرة المفتاحية هي أنّ الأداء في تطبيقات React يتعلّق في معظمه بإدارة المساواة بين المراجع وتجنّب العمل غير الضروري. وحين تستخدم TypeScript لجعل هذه الاهتمامات صريحة في نظام الأنواع، تحصل على أداء أفضل وشيفرة قابلة للصيانة في آنٍ واحد.

أنماط الأداء الآمنة الأنواع ليست عن رشّ `useMemo()` و`useCallback()` في كل مكان (وهذا قد يضرّ بالأداء في الواقع). بل هي عن استخدام TypeScript لإنشاء أنماط قابلة للتنبؤ وثابتة تمنع العمل غير الضروري:

- **مراجع ثابتة**: أنشئ الكائنات والدوالّ خارج التصيير أو خزّنها مؤقتًا على نحو صحيح
- **مُحدِّدات دقيقة**: لا تُعِد التصيير إلّا حين تتغيّر البيانات ذات الصلة فعلًا
- **حدود تخزين ذكية**: استخدم `React.memo()` مع اعتماديات ثابتة
- **مراقبة الأداء**: تتبّع التراجعات والتقاطها عبر مقاييس مُنمَّطة

أفضل تحسينٍ للأداء هو الذي لم تكن بحاجة إلى إجراءه أصلًا لأنّ شيفرتك كانت مهيّأة على نحو صحيح منذ البداية. يساعدك TypeScript على بناء تلك البنية عبر التقاط الأنماط غير الثابتة والتأكّد من أنّ تحسينات أداءك تعمل فعلًا.

جرّب تطبيق أحد هذه الأنماط في مشروعك الحالي — ابدأ بأنواع المراجع الثابتة إن كانت لديك مكوّنات يُعاد تصييرها كثيرًا، أو بعقود البيانات للقراءة فقط إن كنت تتعامل مع تعديلات حالة معقّدة. وستندهش كم تصبح نوايا الأداء لديك أوضح حين تُرمَّز في نظام الأنواع.

تذكّر: التحسين المبكّر هو أصل كل شرّ، لكنّ الأنماط القابلة للتنبؤ التي تمنع فخاخ الأداء الواضحة؟ هذا ببساطة هندسة جيّدة.
