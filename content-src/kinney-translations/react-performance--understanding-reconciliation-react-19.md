---
title: "فهم المطابقة (Reconciliation) في React 19"
---

عملية المطابقة (reconciliation) في React هي السحر الكامن وراء تحديث مكوّناتك بكفاءة — لكنها أيضًا الموضع الذي تختبئ فيه معظم مشكلات الأداء. إن تساءلت يومًا لماذا يبدو تطبيق React لديك بطيئًا، أو لماذا يؤدي تغيير مكوّن واحد إلى عمليات إعادة تصيير غير متوقّعة في مكان آخر، فأنت في المكان الصحيح. لنُزل الغموض عن كيفية مقارنة React لأشجار المكوّنات، وتحديد ما يحتاج إلى تحديث، وجدولة هذا العمل في React 19.

بنهاية هذا الدرس، ستفهم خوارزمية المطابقة فهمًا يكفي لكتابة مكوّنات تعمل *مع* React بدل مصارعتها (وتنقّح مشكلات الأداء كما يفعل المهندس المتمرّس الذي تصير إليه).

## ما هي المطابقة؟

المطابقة هي عملية React لمعرفة ما تغيّر بين عمليات التصيير وتحديث DOM وفقًا لذلك. تخيّلها كخوارزمية فرق (diff) بالغة الذكاء — تقارن React شجرة المكوّنات الجديدة (ما تريد تصييره) بالشجرة السابقة (ما يظهر حاليًا على الشاشة) وتحسب أصغر مجموعة من التغييرات اللازمة.

إليك الرؤية الجوهرية: **لا تتعامل React مع DOM مباشرة أبدًا أثناء التصيير**. بل تبني تمثيلًا افتراضيًا لما ينبغي أن تبدو عليه واجهة المستخدم، وتقارنه بالإصدار السابق، ثم تطبّق التغييرات الضرورية فقط. تحدث هذه العملية على مرحلتين:

1. **مرحلة التصيير**: تستدعي React مكوّناتك وتبني الشجرة الافتراضية الجديدة
2. **مرحلة الإيداع (commit)**: تطبّق React التغييرات المحسوبة على DOM الفعلي

خوارزمية المطابقة هي ما يجعل React سريعة — فبدل إعادة إنشاء DOM بالكامل عند كل تغيّر في الحالة، تحدّث بدقة جراحية ما يحتاج إلى تغيير فقط.

## خوارزمية المطابقة

تتبع مطابقة React مجموعة من القواعد المتوقّعة. فهم هذه القواعد جوهري لأنها تحدّد متى تُعاد مكوّناتك للتصيير ومدى كفاءة أداء تطبيقك.

### القاعدة 1: أنواع العناصر المختلفة = استبدال كامل

عندما تصادف React عناصر من أنواع مختلفة في الموضع نفسه، فإنها تهدم الشجرة الفرعية بالكامل وتبني واحدة جديدة من الصفر.

```typescript
// ❌ This will destroy and recreate the entire subtree
function Application({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return <div>Welcome back!</div>;
  }
  return <span>Please log in</span>; // Different element type!
}

// ✅ Better: Same element type, different content
function Application({ isLoggedIn }: { isLoggedIn: boolean }) {
  return <div>{isLoggedIn ? 'Welcome back!' : 'Please log in'}</div>;
}
```

في المثال الأول، يؤدي التبديل بين `div` و`span` إلى أن تقوم React بما يلي:

1. تُلغي تحميل `div` القديم وتستدعي تأثيرات التنظيف
2. تُنشئ `span` جديدًا من الصفر
3. تُشغّل جميع تأثيرات التهيئة

هذا مكلف ويفقد حالة المكوّن. أما النهج الثاني فيُبقي `div` نفسه ويحدّث محتواه النصي فقط.

### القاعدة 2: تُقارَن العناصر ذات المفاتيح بمفاتيحها

تساعد المفاتيح React على تحديد العناصر التي تغيّرت أو أُضيفت أو حُذفت. بدون مفاتيح، تستخدم React المطابقة القائمة على الموضع، وقد يُسبّب ذلك مشكلات في الأداء وأخطاء.

```typescript
// ❌ Without keys, React matches by position
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li>{todo.text}</li> // No key!
      ))}
    </ul>
  );
}

// ✅ With keys, React matches by identity
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

إليك ما يحدث عندما تضيف عنصرًا إلى بداية القائمة:

**بدون مفاتيح**: تظنّ React أنك عدّلت كل عنصر موجود وأضفت عنصرًا في النهاية. فتُعاد كل عناصر `<li>` للتصيير بلا داعٍ.

**مع مفاتيح**: تتعرّف React على العناصر الموجودة من خلال مفاتيحها وتنشئ العنصر الجديد فقط. كفاءة أعلى بكثير!

> **تحذير**
>
> لا تستخدم فهارس المصفوفة مفاتيح إن كانت قائمتك قابلة لتغيّر الترتيب. عندما تتغيّر مواضع العناصر، سترى React مفاتيح مختلفة في مواضع مختلفة وتظنّ أن العناصر تغيّرت.

### القاعدة 3: نوع المكوّن نفسه = مطابقة الخصائص والحالة

عندما تصادف React نوع المكوّن نفسه في الموضع نفسه، تُبقي نسخة المكوّن حيّة وتحدّث الخصائص المتغيّرة فقط.

```typescript
function UserProfile({ userId, theme }: { userId: string; theme: 'light' | 'dark' }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return <div className={theme}>{user ? <h1>{user.name}</h1> : <div>Loading...</div>}</div>;
}

// When parent re-renders with same userId but different theme:
// - Component instance stays the same
// - State (user) is preserved
// - Only the className updates
// - useEffect doesn't re-run because userId didn't change
```

لهذا السبب يمكن لمكوّنات React الحفاظ على الحالة عبر عمليات إعادة التصيير — فما دامت في الموضع نفسه وبالنوع نفسه، تحتفظ React بنسخة المكوّن.

## تحسينات المطابقة في React 19

يقدّم React 19 عدة تحسينات تجعل المطابقة أكثر كفاءة وقابلية للتنبّؤ.

### التجميع التلقائي في كل مكان

يوسّع React 19 التجميع التلقائي ليعمل باطراد في جميع السياقات — بما في ذلك setTimeout والوعود (promises) ومعالجات الأحداث الأصلية.

```typescript
// ✅ In React 19, these are automatically batched
function handleClick() {
  setCount(count + 1);
  setName('Alice');
  setActive(true);
  // Only one re-render happens, not three!
}

// ✅ Even in async contexts
setTimeout(() => {
  setCount(count + 1);
  setName('Bob');
  // Still batched in React 19!
}, 1000);
```

يعني هذا عمليات إعادة تصيير غير ضرورية أقل وأداءً أفضل دون أي إعداد.

### ميزات التزامن المحسّنة

يمكن لمُصيّر React 19 المتزامن مقاطعة العمل منخفض الأولوية لمعالجة التحديثات عالية الأولوية (مثل إدخال المستخدم) فورًا.

```typescript
// High-priority update (user typing)
function SearchInput() {
  const [query, setQuery] = useState('');

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)} // High priority
    />
  );
}

// Low-priority update (expensive search results)
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // This work can be interrupted for high-priority updates
    searchExpensively(query).then(setResults);
  }, [query]);

  return (
    <div>
      {results.map((result) => (
        <ResultItem key={result.id} result={result} />
      ))}
    </div>
  );
}
```

يضمن React 19 أن تظلّ الكتابة في مربّع البحث سريعة الاستجابة حتى أثناء تشغيل عمليات بحث مكلفة في الخلفية.

## مزالق الأداء الشائعة في المطابقة

يساعدك فهم المطابقة على تجنّب هذه الفخاخ الشائعة في الأداء:

### المزلق 1: إنشاء كائنات أثناء التصيير

```typescript
// ❌ Creates a new object every render
function UserCard({ user }: { user: User }) {
  return (
    <UserAvatar
      user={user}
      style={{ borderRadius: '50%', width: 40 }} // New object!
    />
  );
}

// ✅ Stable reference
const AVATAR_STYLE = { borderRadius: '50%', width: 40 };

function UserCard({ user }: { user: User }) {
  return <UserAvatar user={user} style={AVATAR_STYLE} />;
}
```

يُنشئ الإصدار الأول كائن `style` جديدًا عند كل عملية تصيير، فيظنّ `UserAvatar` أن خصائصه تغيّرت ويُعاد تصييره بلا داعٍ.

### المزلق 2: دوال كخصائص

```typescript
// ❌ New function every render
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)} // New function!
        />
      ))}
    </div>
  );
}

// ✅ Stable callback with useCallback
function TodoList({ todos }: { todos: Todo[] }) {
  const handleToggle = useCallback((todoId: string) => {
    toggleTodo(todoId);
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={() => handleToggle(todo.id)} />
      ))}
    </div>
  );
}
```

> **نصيحة**
>
> في React 19، قد لا تحتاج إلى `useCallback` بالقدر نفسه بفضل React Compiler، الذي يستطيع حفظ الدوال تلقائيًا في الذاكرة (memoize) عندما يكون ذلك مفيدًا.

### المزلق 3: تغيّر الموضع عند التصيير الشرطي

```typescript
// ❌ Component position changes based on condition
function Dashboard({ showSidebar }: { showSidebar: boolean }) {
  return (
    <div>
      {showSidebar && <Sidebar />}
      <MainContent />
    </div>
  );
}

// ✅ Consistent component positions
function Dashboard({ showSidebar }: { showSidebar: boolean }) {
  return (
    <div>
      <Sidebar visible={showSidebar} />
      <MainContent />
    </div>
  );
}
```

في المثال الأول، يتغيّر موضع `MainContent` في الشجرة عند تبديل `showSidebar`، وقد يُسبّب ذلك عمليات إعادة تصيير غير ضرورية. أما النهج الثاني فيُبقي المواضع ثابتة.

## التحسين من أجل المطابقة

إليك بعض الاستراتيجيات العملية لكتابة مكوّنات صديقة للمطابقة:

### استخدم `React.memo()` بحكمة

```typescript
// ✅ Memo prevents re-renders when props haven't changed
const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
  onUpdate,
}: {
  data: ComplexData;
  onUpdate: (id: string) => void;
}) {
  // Expensive rendering logic here
  return <div>{/* Complex UI */}</div>;
});
```

يُجري `React.memo()` مقارنة سطحية للخصائص ويتخطّى إعادة التصيير إن لم يتغيّر شيء. وهو مفيد بوجه خاص للمكوّنات التي تتلقّى خصائص ثابتة لكن منطق تصييرها مكلف.

### أنزل الحالة إلى الأسفل

```typescript
// ❌ High-level state causes unnecessary re-renders
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  return (
    <div>
      <Header user={user} /> {/* Re-renders when count changes */}
      <Counter count={count} onIncrement={() => setCount((c) => c + 1)} />
      <Footer />
    </div>
  );
}

// ✅ State lives closer to where it's needed
function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Header user={user} /> {/* Stable now */}
      <CounterSection /> {/* Count state lives here */}
      <Footer />
    </div>
  );
}

function CounterSection() {
  const [count, setCount] = useState(0);
  return <Counter count={count} onIncrement={() => setCount((c) => c + 1)} />;
}
```

نقل الحالة إلى موضع أقرب إلى استخدامها يقلّل عدد المكوّنات التي تحتاج إلى إعادة التصيير عند تغيّر تلك الحالة.

### افصل الحالة سريعة التغيّر

```typescript
// ❌ Mouse position causes everything to re-render
function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      <UserProfile user={user} /> {/* Re-renders constantly! */}
      <MouseTracker position={mousePos} />
    </div>
  );
}

// ✅ Isolate frequently-changing state
function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <UserProfile user={user} /> {/* Stable */}
      <MouseTrackerWrapper /> {/* Mouse state isolated here */}
    </div>
  );
}
```

عزل الحالة سريعة التغيّر يمنعها من إحداث عمليات إعادة تصيير غير ضرورية في مكوّنات لا علاقة لها بها.

## تنقيح مشكلات المطابقة

تقدّم React DevTools رؤى ممتازة في أداء المطابقة:

### تبويب Profiler

1. افتح React DevTools
2. انتقل إلى تبويب «Profiler»
3. انقر «Record» وتفاعل مع تطبيقك
4. أوقف التسجيل لترى أيّ المكوّنات أُعيد تصييرها ولماذا

ابحث عن:

- **عمليات إعادة تصيير غير متوقّعة**: مكوّنات ما كان ينبغي أن تتحدّث
- **عمليات تصيير مكلفة**: مكوّنات تستغرق وقتًا طويلًا في التصيير
- **تحديثات متسلسلة**: تغيير واحد يُحدث تغييرات كثيرة أخرى

### مكتبة Why Did You Render

تستطيع مكتبة [`@welldone-software/why-did-you-render`](https://www.npmjs.com/package/@welldone-software/why-did-you-render) اكتشاف عمليات إعادة التصيير غير الضرورية تلقائيًا:

```typescript
// In development only
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

// Mark components to track
MyComponent.whyDidYouRender = true;
```

سيسجّل هذا في الطرفية كلما أُعيد تصيير `MyComponent` بالخصائص نفسها، ما يساعدك على تحديد مواضع عدم الكفاءة في المطابقة.

## أنماط أداء من الواقع العملي

إليك بعض الأنماط التي وجدتها فعّالة في تطبيقات React الإنتاجية:

### التمرير الافتراضي للقوائم الكبيرة

```typescript
// ✅ Only render visible items
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }: { items: Item[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  );

  return (
    <List height={600} itemCount={items.length} itemSize={50}>
      {Row}
    </List>
  );
}
```

يصيّر التمرير الافتراضي العناصر الظاهرة حاليًا فقط، فيبقى عمل المطابقة ثابتًا مهما كان حجم القائمة.

### المكوّنات المركّبة لواجهات معقّدة

```typescript
// ✅ Stable structure, flexible content
function DataTable({ children }: { children: React.ReactNode }) {
  return <table>{children}</table>;
}

DataTable.Header = function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
};

DataTable.Body = function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
};

// Usage maintains consistent tree structure
function UserTable({ users }: { users: User[] }) {
  return (
    <DataTable>
      <DataTable.Header>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </DataTable.Header>
      <DataTable.Body>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </DataTable.Body>
    </DataTable>
  );
}
```

توفّر المكوّنات المركّبة بنية شجرة متّسقة مع إبقاء الواجهة البرمجية مرنة وصديقة للمطابقة.
