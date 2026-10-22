---
title: "التصيير النوافذي والافتراضي في القوائم الطويلة"
---

هل تصيّر 10,000 عنصر قائمة في React؟ سيرفض متصفحك بأدب بواجهة مجمدة وتسريب ذاكرة. الحل ليس رمي مزيد من الذاكرة على المشكلة — بل أن تكون أذكى فيما تصيّره. التصيير النوافذي (windowing)، ويسمى أيضًا الافتراضية (virtualization)، يصيّر فقط العناصر الظاهرة في إطار العرض، فيبقي واجهتك سريعة حتى مع مجموعات بيانات ضخمة. سنستكشف كيفية تنفيذ ذلك باستخدام `react-window`، والتعامل مع الحالات الطرفية، ومراعاة إمكانية الوصول، مع تحويل القوائم المتثاقلة إلى تجارب بالغة السلاسة.

## ما التصيير النوافذي؟

التصيير النوافذي كالنظر عبر نافذة إلى لوحة ضخمة — لا ترى إلا الجزء الذي يتسع في الإطار. وعندما تمرر، تكشف أقسامًا مختلفة، لكن اللوحة كاملة لا تُحمَّل في مجال رؤيتك دفعة واحدة. سيكون ذلك سخيفًا (ومكلفًا).

في سياق تطبيقات React، يعني التصيير النوافذي:

1. **أن تصيّر العناصر الظاهرة فقط**: إن كان إطار العرض يعرض 10 صفوف، فصيّر نحو 15-20 لمعالجة التمرير السلس
2. **أن تعيد تدوير عقد DOM**: عندما تخرج عناصر من مجال الرؤية بالتمرير، تُعاد عقد DOM الخاصة بها للاستخدام مع عناصر جديدة تدخل
3. **أن تحافظ على موضع التمرير**: يجب ألا يعرف المستخدمون أبدًا أن عناصر تُضاف وتُزال

يحوّل هذا الأسلوب قوائم كانت ستنهار متصفحك عادةً إلى تجارب أداء واستجابة.

## متى تحتاج التصيير النوافذي

إليك بعض حالات الاستخدام الواقعية™ التي يصبح فيها التصيير النوافذي ضروريًا:

- **جداول البيانات** بمئات الصفوف أو آلافها
- **تطبيقات الدردشة** بسجلات رسائل طويلة
- **مستكشفات الملفات** بالكثير من العناصر
- **خلاصات التواصل الاجتماعي** (وإن كان التمرير اللانهائي يقترن غالبًا بالتصيير النوافذي)
- **عارضات السجلات** التي تعرض آلاف المدخلات
- **قوائم منسدلة** بمئات الخيارات

القاعدة العامة: إن كنت تصيّر أكثر من 50-100 عنصر متشابه، ففكّر في التصيير النوافذي.

> **نصيحة**
>
> ابدأ قياس الأداء عند نحو 50 عنصرًا. قد تفاجئك سرعة التباطؤ، خصوصًا على الأجهزة المحمولة.

## تثبيت react-window

سنستخدم `react-window`، أشهر مكتبة تصيير نوافذي لـ React. إنها خليفة `react-virtualized` لكن بحجم حزمة أصغر وواجهة أبسط.

```bash
npm install react-window
# If you're using TypeScript (and you should be):
npm install --save-dev @types/react-window
```

لحالات استخدام أكثر تقدمًا، قد ترغب أيضًا في:

```bash
# For dynamic item heights and additional features
npm install react-window-infinite-loader
npm install react-virtualized-auto-sizer
```

## قائمة أساسية ثابتة الحجم

لنبدأ بأبسط حالة: قائمة يكون فيها كل عنصر بالارتفاع نفسه.

```typescript
import { FixedSizeList as List } from 'react-window';

interface Item {
  id: string;
  name: string;
  email: string;
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: Item[];
}

// Individual row component
const Row: React.FC<RowProps> = ({ index, style, data }) => {
  const item = data[index];

  return (
    <div style={style} className="flex items-center border-b p-4">
      <div className="font-medium">{item.name}</div>
      <div className="ml-4 text-gray-600">{item.email}</div>
    </div>
  );
};

// Main list component
const UserList: React.FC<{ users: Item[] }> = ({ users }) => {
  return (
    <List
      height={400} // Container height
      itemCount={users.length}
      itemSize={60} // Height of each row
      itemData={users} // Data passed to each row
      width="100%"
    >
      {Row}
    </List>
  );
};
```

نقاط رئيسية في هذا التنفيذ:

- **خاصية `style`**: طبّقها دائمًا على العنصر الجذر لصفك — فهي تضع العناصر في مواضعها الصحيحة
- **`itemData`**: مرّر بياناتك عبر هذه الخاصية بدلًا من الإغلاق لتجنب إعادة إنشاء مكوّنات الصفوف
- **أبعاد ثابتة**: يجب أن يكون `height` و`itemSize` معروفين مسبقًا

## قوائم متغيرة الحجم

نادرًا ما تناسب بيانات العالم الحقيقي صناديق موحدة. فأطوال الأسماء تختلف، وأحجام التعليقات تتفاوت، والمحتوى ديناميكي. في هذه الحالات، استخدم `VariableSizeList`:

```typescript
import { VariableSizeList as List } from 'react-window';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: Comment[];
}

const CommentRow: React.FC<RowProps> = ({ index, style, data }) => {
  const comment = data[index];

  return (
    <div style={style} className="border-b p-4">
      <div className="text-sm font-medium text-gray-500">
        {comment.author} • {comment.timestamp.toLocaleDateString()}
      </div>
      <div className="mt-2">{comment.content}</div>
    </div>
  );
};

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  // Calculate the height of each item
  const getItemSize = (index: number): number => {
    const comment = comments[index];
    // Base height + content height estimation
    const baseHeight = 60; // Author info + padding
    const contentHeight = Math.ceil(comment.content.length / 50) * 20;
    return baseHeight + contentHeight;
  };

  return (
    <List
      height={400}
      itemCount={comments.length}
      itemSize={getItemSize}
      itemData={comments}
      width="100%"
    >
      {CommentRow}
    </List>
  );
};
```

> **تحذير**
>
> القوائم متغيرة الحجم أعقد لأن `react-window` يحتاج إلى معرفة ارتفاع كل عنصر قبل التصيير. التقديرات الضعيفة قد تسبب قفزات في التمرير أو مواضع تمرير غير صحيحة.

## التحجيم التلقائي للحاوية

ليس ترميز أبعاد الحاوية يدويًا عمليًا دائمًا. يكتشف `react-virtualized-auto-sizer` حجم الحاوية الأم ويمرره إلى قائمتك:

```typescript
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

const ResponsiveUserList: React.FC<{ users: Item[] }> = ({ users }) => {
  return (
    <div className="h-full">
      {' '}
      {/* Parent container */}
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={users.length}
            itemSize={60}
            itemData={users}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};
```

هذا مفيد خاصةً في التخطيطات المتجاوبة حيث تحتاج القائمة إلى ملء المساحة المتاحة.

## إضافة عناصر تحكم في التمرير

أحيانًا تحتاج إلى تحكم برمجي في التمرير — الانتقال إلى عناصر محددة، أو التمرير السلس، أو استعادة موضع التمرير:

```typescript
import { useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';

const ControllableList: React.FC<{ users: Item[] }> = ({ users }) => {
  const listRef = useRef<List>(null);

  const scrollToUser = useCallback(
    (userId: string) => {
      const index = users.findIndex((user) => user.id === userId);
      if (index !== -1 && listRef.current) {
        listRef.current.scrollToItem(index, 'center');
      }
    },
    [users],
  );

  const scrollToTop = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(0, 'start');
    }
  }, []);

  return (
    <div>
      <div className="mb-4 space-x-2">
        <button onClick={scrollToTop} className="rounded bg-blue-500 px-4 py-2 text-white">
          Scroll to Top
        </button>
        <button
          onClick={() => scrollToUser('user-100')}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Jump to User 100
        </button>
      </div>

      <List
        ref={listRef}
        height={400}
        itemCount={users.length}
        itemSize={60}
        itemData={users}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};
```

## التعامل مع حالات التحميل والتمرير اللانهائي

غالبًا ما تحمّل التطبيقات الواقعية البيانات تدريجيًا. اجمع التصيير النوافذي مع التمرير اللانهائي للتعامل مع مجموعات بيانات ضخمة فعلًا:

```typescript
import { useState, useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

interface InfiniteUserListProps {
  loadMoreUsers: (startIndex: number, stopIndex: number) => Promise<Item[]>;
}

const InfiniteUserList: React.FC<InfiniteUserListProps> = ({ loadMoreUsers }) => {
  const [users, setUsers] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Check if an item is loaded
  const isItemLoaded = useCallback(
    (index: number) => {
      return index < users.length;
    },
    [users.length],
  );

  // Load more items
  const loadMoreItems = useCallback(
    async (startIndex: number, stopIndex: number) => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        const newUsers = await loadMoreUsers(startIndex, stopIndex);
        if (newUsers.length === 0) {
          setHasNextPage(false);
        } else {
          setUsers((prev) => [...prev, ...newUsers]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, loadMoreUsers],
  );

  // Row component that handles loading states
  const Row: React.FC<RowProps> = ({ index, style, data }) => {
    const user = data[index];

    // Show loading skeleton for unloaded items
    if (!user) {
      return (
        <div style={style} className="flex animate-pulse items-center border-b p-4">
          <div className="h-4 w-32 rounded bg-gray-300"></div>
          <div className="ml-4 h-4 w-48 rounded bg-gray-300"></div>
        </div>
      );
    }

    return (
      <div style={style} className="flex items-center border-b p-4">
        <div className="font-medium">{user.name}</div>
        <div className="ml-4 text-gray-600">{user.email}</div>
      </div>
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasNextPage ? users.length + 1 : users.length}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          ref={ref}
          height={400}
          itemCount={hasNextPage ? users.length + 1 : users.length}
          itemSize={60}
          itemData={users}
          onItemsRendered={onItemsRendered}
          width="100%"
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};
```

## اعتبارات الأداء

### عدد التجاوز (overscan)

افتراضيًا، يصيّر `react-window` بعض العناصر الإضافية خارج إطار العرض لجعل التمرير أكثر سلاسة. يمكنك ضبط ذلك:

```typescript
<List
  // ... other props
  overscanCount={5} // Render 5 extra items above and below viewport
>
  {Row}
</List>
```

القيم الأعلى = تمرير أكثر سلاسة لكن استهلاك ذاكرة أكبر. القيم الأدنى = استهلاك ذاكرة أفضل لكن احتمال تعثّر التمرير.

### الحفظ (memoization)

امنع إعادة التصيير غير الضرورية لمكوّنات صفوفك:

```typescript
import { memo } from 'react';

const Row = memo<RowProps>(({ index, style, data }) => {
  const item = data[index];

  return (
    <div style={style} className="flex items-center border-b p-4">
      <div className="font-medium">{item.name}</div>
      <div className="ml-4 text-gray-600">{item.email}</div>
    </div>
  );
});
```

### تجنّب الكائنات المضمّنة

لا تنشئ كائنات أثناء التصيير — فستسبب إعادة تصيير كل صف:

```typescript
// ❌ Bad - creates new style object every render
<List itemData={{ users, theme: 'dark' }}>

// ✅ Good - stable reference
const itemData = useMemo(() => ({ users, theme }), [users, theme]);
<List itemData={itemData}>
```

## اعتبارات إمكانية الوصول

قد يكسر التصيير النوافذي تنقّل قارئ الشاشة لأن عناصر DOM تُضاف وتُزال باستمرار. إليك كيفية الحفاظ على إمكانية الوصول:

```typescript
const AccessibleRow: React.FC<RowProps> = ({ index, style, data }) => {
  const item = data[index];

  return (
    <div
      style={style}
      className="flex items-center border-b p-4"
      role="listitem"
      aria-setsize={data.length}
      aria-posinset={index + 1}
      aria-label={`${item.name}, ${item.email}`}
    >
      <div className="font-medium">{item.name}</div>
      <div className="ml-4 text-gray-600">{item.email}</div>
    </div>
  );
};

const AccessibleUserList: React.FC<{ users: Item[] }> = ({ users }) => {
  return (
    <List
      height={400}
      itemCount={users.length}
      itemSize={60}
      itemData={users}
      width="100%"
      role="list"
      aria-label={`List of ${users.length} users`}
    >
      {AccessibleRow}
    </List>
  );
};
```

خصائص إمكانية الوصول الرئيسية:

- `role="list"` و`role="listitem"` للبنية الدلالية
- `aria-setsize` و`aria-posinset` يساعدان قارئات الشاشة على فهم الموضع
- `aria-label` يوفر سياقًا للقائمة كاملة

## مزالق شائعة

### حسابات ارتفاع غير صحيحة

القوائم متغيرة الحجم حساسة بشكل خاص لأخطاء حساب الارتفاع:

```typescript
// ❌ Bad - can cause scroll jumping
const getItemSize = (index: number) => {
  return Math.random() * 100; // Unpredictable heights
};

// ✅ Good - deterministic height calculation
const getItemSize = (index: number) => {
  const item = data[index];
  const baseHeight = 40;
  const contentLines = Math.ceil(item.content.length / CHARS_PER_LINE);
  return baseHeight + contentLines * LINE_HEIGHT;
};
```

### نسيان خاصية style

يجب على كل مكوّن صف أن يطبّق خاصية `style`:

```typescript
// ❌ Bad - missing style prop
const Row = ({ index, data }) => <div>{data[index].name}</div>;

// ✅ Good - style prop applied
const Row = ({ index, style, data }) => <div style={style}>{data[index].name}</div>;
```

### تسريبات ذاكرة في مكوّنات الصفوف

تجنّب إنشاء مستمعات أحداث أو اشتراكات في مكوّنات الصفوف دون تنظيف:

```typescript
// ❌ Bad - potential memory leak
const Row = ({ index, style, data }) => {
  useEffect(() => {
    const subscription = subscribe(data[index].id);
    // Missing cleanup!
  }, []);

  return <div style={style}>{data[index].name}</div>;
};

// ✅ Good - proper cleanup
const Row = ({ index, style, data }) => {
  useEffect(() => {
    const subscription = subscribe(data[index].id);
    return () => subscription.unsubscribe();
  }, [data[index].id]);

  return <div style={style}>{data[index].name}</div>;
};
```

## متى لا تستخدم التصيير النوافذي

التصيير النوافذي ليس الحل الصحيح دائمًا:

- **القوائم الصغيرة** (أقل من 50 عنصرًا): التعقيد عادةً لا يستحق
- **القوائم ذات التفاعلات المعقدة**: السحب والإفلات، التحديد المتعدد عبر نطاقات كبيرة
- **عندما تحتاج كل العناصر في DOM**: بعض مكتبات الطرف الثالث تتوقع وجود كل العناصر
- **المحتوى الحرج لمحركات البحث**: لا تستطيع محركات البحث فهرسة المحتوى الافتراضي

## الخطوات التالية
