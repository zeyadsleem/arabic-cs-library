---
title: "استقرار المفاتيح في القوائم"
---

لعلّك رأيت هذا التحذير: «Each child in a list should have a unique "key" prop». وربما أضفت بعض المفاتيح عبر `Math.random()` لإسكاته (وقد مرّ بها جميعًا). لكن المفاتيح ليست مجرد وسيلة لإسكات التحذيرات — بل وسيلة للحفاظ على واجهتك مستقرة وسريعة وقابلة للتنبؤ عند تغيّر القوائم. فإن أخطأت فيها، فسترى إعادات تركيب غامضة للمكوّنات، وفقدانًا للتركيز، ورسومًا متحركة معطوبة، ومشكلات أداء تجعلك تشكّ في خياراتك في الحياة.

تخبر المفاتيح React أي عناصر القائمة يقابل أيًّا منها عبر عمليات التصيير. وعندما تتغيّر قائمتك — بإضافة عناصر أو حذفها أو إعادة ترتيبها — يستخدم React المفاتيح لتحديث DOM بكفاءة والحفاظ على حالة المكوّن حيث ينبغي الحفاظ عليها. فكّر في المفاتيح كطريقة React في القول «مكوّن `TodoItem` هذا يمثّل المهمة ذاتها كما قبل، فحدّث خصائصه فقط» بدلًا من «أزِل هذا المكوّن وأنشئ مكوّنًا جديدًا تمامًا».

## المشكلة: مفاتيح غير مستقرة

لنبدأ بما **لا** يجب فعله. إليك قائمة مهام بريئة الظاهر ستنقضّ عليك:

```typescript
// ❌ Bad: Using array indices as keys
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </ul>
  );
}

// ❌ Worse: Random keys
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={Math.random()} todo={todo} />
      ))}
    </ul>
  );
}
```

ماذا يحدث عند إضافة عنصر إلى بداية هذه القائمة؟ لنتتبّع ذلك:

**قبل الإضافة:**

- العنصر A له المفتاح `0`
- العنصر B له المفتاح `1`
- العنصر C له المفتاح `2`

**بعد إضافة العنصر D في البداية:**

- العنصر D له المفتاح `0` (كان مفتاح العنصر A!)
- العنصر A له المفتاح `1` (كان مفتاح العنصر B!)
- العنصر B له المفتاح `2` (كان مفتاح العنصر C!)
- العنصر C له المفتاح `3` (مفتاح جديد)

يرى React ذلك فيظن أن «العنصر في الموضع 0 تغيّر من A إلى D، والموضع 1 تغيّر من B إلى A»، وهكذا. فبدلًا من إدراك أننا أدرجنا عنصرًا جديدًا واحدًا فقط، يظن أننا غيّرنا ثلاثة عناصر موجودة وأضفنا عنصرًا جديدًا واحدًا. والنتيجة؟ إعادات تصيير غير ضرورية، وفقدان لحالة المكوّن، وأداء ضعيف.

## نتائج واقعية

إليك مثالًا ملموسًا تُسبّب فيه المفاتيح غير المستقرة مشكلات واقعية فعلية:

```typescript
function EditableTodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  return (
    <li>
      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.text}</span>
      )}
    </li>
  );
}
```

مع المفاتيح القائمة على الفهرس:

1. ينقر المستخدم على «شراء البقالة» (الفهرس 2) لتحريرها
2. حالة المكوّن: `isEditing: true`, `editValue: "Buy groceries"`
3. يضيف مستخدم آخر «التنزّه بالكلب» في بداية القائمة
4. أصبحت «شراء البقالة» الآن في الفهرس 3، لكن React يظن أن الفهرس 2 عنصر مختلف
5. فتُطبَّق حالة التحرير على مهمة خاطئة
6. فيفقد المستخدم تقدّم تحريره ويصبح يحرّر عنصرًا مختلفًا تمامًا

هذا ليس نظريًا — بل هو نوع الأخطاء الذي يجعل المستخدمين يظنون أن تطبيقك معطوب.

## الحل: مفاتيح مستقرة وفريدة

الإصلاح مباشر: استخدم معرّفات مستقرة وفريدة كمفاتيح. وإذا كانت بياناتك تحتوي على معرّفات (وهذا ما ينبغي)، فاستخدمها:

```typescript
// ✅ Good: Using stable, unique IDs
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```

والآن عند إضافة عناصر أو حذفها أو إعادة ترتيبها:

- يحافظ كل مكوّن على هويته
- تُحفظ الحالة حيث ينبغي
- يبقى التركيز على العنصر الصحيح
- تعمل الرسوم المتحركة بسلاسة
- يستطيع React تحديث ما تغيّر فعلًا فقط بكفاءة

### عندما لا تملك معرّفات

أحيانًا لا تأتي بياناتك بمعرّفات فريدة. وهذه خياراتك مرتّبة من الأفضل إلى الأسوأ:

```typescript
// ✅ Generate stable IDs when creating items
const [todos, setTodos] = useState<Todo[]>([]);

const addTodo = (text: string) => {
  const newTodo = {
    id: crypto.randomUUID(), // or Date.now(), or your favorite ID generator
    text,
    completed: false,
  };
  setTodos((prev) => [...prev, newTodo]);
};

// ⚠️ Acceptable: Use a stable property that's unique
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map((user) => (
        <UserItem key={user.email} user={user} /> // Only if email is unique!
      ))}
    </ul>
  );
}

// ⚠️ Sometimes necessary: Combine properties to ensure uniqueness
function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem key={`${comment.userId}-${comment.timestamp}`} comment={comment} />
      ))}
    </ul>
  );
}
```

## المفاتيح والحفاظ على حالة المكوّن

تتحكّم المفاتيح في متى يحافظ React على حالة المكوّن ومتى ينشئ نُسخًا جديدة. وهذا حاسم للمكوّنات ذات الحالة الداخلية:

```typescript
function TabPanel({ activeTab }: { activeTab: string }) {
  return (
    <div>
      {activeTab === 'profile' && <ProfileForm key="profile" />}
      {activeTab === 'settings' && <SettingsForm key="settings" />}
      {activeTab === 'billing' && <BillingForm key="billing" />}
    </div>
  );
}

function ProfileForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  // This state is preserved when switching tabs and coming back
  // because the key stays the same ('profile')

  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
      />
      {/* More form fields... */}
    </form>
  );
}
```

لولا المفاتيح المستقرة، لأعاد التبديل بين التبويبات تعيين حالة النموذج في كل مرة. ومع المفاتيح المستقرة، يعرف React أنه ينبغي إعادة استخدام نسخة المكوّن نفسها.

## المفاتيح والأداء

لا تتعلق المفاتيح المستقرة بالصحة فقط — بل هي تحسين للأداء. فخوارزمية المطابقة (reconciliation) في React تستخدم المفاتيح من أجل:

1. **تحديد العناصر المنقولة**: فبدلًا من الحذف وإعادة الإنشاء، يستطيع React نقل عُقد DOM
2. **تقليل تعديلات DOM**: فلا تُحدَّث إلا العناصر المتغيّرة
3. **الحفاظ على الحسابات المكلفة**: فلا تُعاد حالات المكوّن وتأثيراته بلا داعٍ

إليك مقارنة أداء:

```typescript
// ❌ Bad: Index keys cause unnecessary work
function ExpensiveList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <ExpensiveItem key={index} item={item} />
      ))}
    </ul>
  );
}

function ExpensiveItem({ item }: { item: Item }) {
  // Expensive computation that happens in useEffect
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    // This runs every time the component mounts
    const result = expensiveDataProcessing(item.data);
    setProcessedData(result);
  }, [item.data]);

  return <li>{/* Render processed data */}</li>;
}
```

مع مفاتيح الفهرس، تؤدي إضافة عنصر في البداية إلى إعادة تركيب كل المكوّنات، وإعادة تشغيل جميع الحسابات المكلفة. أما مع المفاتيح المستقرة، فلا يحتاج إلى المعالجة إلا العنصر الجديد.

## سيناريوهات متقدّمة للمفاتيح

### القوائم المتداخلة

عندما تكون لديك قوائم داخل قوائم، يحتاج كل مستوى إلى مفاتيحه المستقرة الخاصة:

```typescript
function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>{item.name}</li> // Different namespace
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

لا تحتاج المفاتيح إلى أن تكون فريدة عالميًا، بل بين العناصر الشقيقة فقط. فقد يكون `item.id` نفسه في فئات مختلفة.

### أنواع المحتوى الديناميكية

أحيانًا تحتوي قائمتك على أنواع مختلفة من المكوّنات:

```typescript
function FeedList({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => {
        // Key must be unique regardless of post type
        const key = post.id;

        switch (post.type) {
          case 'text':
            return <TextPost key={key} post={post} />;
          case 'image':
            return <ImagePost key={key} post={post} />;
          case 'video':
            return <VideoPost key={key} post={post} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
```

فرغم أن المكوّنات من أنواع مختلفة، يمكنها مشاركة المفاتيح لأنها تمثّل العنصر المنطقي نفسه.

### التصيير الشرطي في القوائم

احذر التصيير الشرطي داخل القوائم:

```typescript
// ❌ Bad: Key disappears when item.isVisible is false
function ItemList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (item.isVisible ? <ItemComponent key={item.id} item={item} /> : null))}
    </ul>
  );
}

// ✅ Better: Always render, control visibility with CSS/props
function ItemList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} hidden={!item.isVisible} />
      ))}
    </ul>
  );
}
```

عندما تختفي المفاتيح ثم تظهر من جديد، يعاملها React كمكوّنات جديدة، فيفقد الحالة ويسبّب إعادات تركيب غير ضرورية.

## مزالق شائعة وحلولها

### مفتاح «يعمل على جهازي»

```typescript
// ❌ Dangerous: Works until you deploy to production
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <ul>
      {messages.map((message, index) => (
        <MessageItem key={`${message.userId}-${index}`} message={message} />
      ))}
    </ul>
  );
}
```

يبدو هذا جيدًا، لكن ماذا يحدث عندما تُقسَّم الرسائل إلى صفحات أو تُرشَّح؟ فقد تحصل الرسالة نفسها على مفاتيح مختلفة في عمليات تصيير مختلفة.

```typescript
// ✅ Solution: Use data that uniquely identifies the item
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <ul>
      {messages.map((message) => (
        <MessageItem
          key={message.id || `${message.userId}-${message.timestamp}`}
          message={message}
        />
      ))}
    </ul>
  );
}
```

### مفتاح التحسين قبل الأوان

```typescript
// ❌ Don't get too clever with keys
function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product, index) => (
        <ProductItem
          key={`${product.category}-${index}`} // Trying to be "smart"
          product={product}
        />
      ))}
    </ul>
  );
}
```

استخدم المعرّف فقط. وقاوم الرغبة في ترميز معلومات إضافية داخل المفاتيح — فهذا ما وُجدت الخصائص من أجله.

## اختبار استقرار المفاتيح

يمكنك اكتشاف الأخطاء المتعلقة بالمفاتيح ببعض الاختبارات الموجّهة:

```typescript
// Test that demonstrates the importance of stable keys
test('preserves input focus when list items are reordered', async () => {
  const initialTodos = [
    { id: '1', text: 'First todo' },
    { id: '2', text: 'Second todo' },
    { id: '3', text: 'Third todo' },
  ];

  const { rerender } = render(<TodoList todos={initialTodos} />);

  // Focus on the second input
  const secondInput = screen.getByDisplayValue('Second todo');
  secondInput.focus();
  expect(secondInput).toHaveFocus();

  // Reorder the list
  const reorderedTodos = [
    { id: '2', text: 'Second todo' },
    { id: '1', text: 'First todo' },
    { id: '3', text: 'Third todo' },
  ];

  rerender(<TodoList todos={reorderedTodos} />);

  // Focus should remain on the same logical item
  const stillFocusedInput = screen.getByDisplayValue('Second todo');
  expect(stillFocusedInput).toHaveFocus();
});
```
