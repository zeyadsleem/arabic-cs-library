---
title: "أنواع المكوّنات المركّبة والخانات"
---

المكوّنات المركّبة (compound components) من أنماط React وأنيقها — فهي تتيح لك تركيب واجهات تتعاون فيها مكوّنات متعدّدة بسلاسة (فكّر في `<select>` و`<option>`، لكن تصميم الواجهة البرمجية بيدك). وحين تضيف TypeScript إلى المعادلة، تستطيع إنشاء علاقات آمنة الأنواع بين المكوّنات الأصلية والفرعية تمنع أخطاء وقت التشغيل وتقدّم تجربة تطوير ممتازة. لنتعرّف كيف نبني مكوّنات Menu وTabs وList المرنة والمتينة في آنٍ واحد.

الفكرة المحورية في المكوّنات المركّبة أن المكوّن الأصل يدير الحالة المشتركة بينما تتولّى المكوّنات الفرعية منطق تصييرها الخاص. ويساعدنا TypeScript على التأكّد من نمذجة هذه العلاقات على نحو صحيح وأن تدفّق البيانات بين المكوّنات يسير بطرق يمكن التنبّؤ بها.

## فهم المكوّنات المركّبة

قبل الغوص في تفاصيل TypeScript، لنثبّت ما الذي يجعل المكوّن مركّبًا. في جوهره، هو مجموعة مكوّنات مصمّمة للعمل معًا، حيث:

- المكوّن الأصل يدير الحالة المشتركة والسياق
- المكوّنات الفرعية تستقبل الخصائص والسياق لتعرض بشكل مناسب
- تبدو الواجهة البرمجية بديهية وتعبيرية لمستهلكيها

إليك نمط مكوّنات مركّبة بسيطًا من دون TypeScript:

```jsx
// ❌ No type safety
function Menu({ children }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div role="menu">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          selectedId,
          onSelect: setSelectedId,
        }),
      )}
    </div>
  );
}

function MenuItem({ id, children, selectedId, onSelect }) {
  return (
    <button
      role="menuitem"
      className={selectedId === id ? 'selected' : ''}
      onClick={() => onSelect(id)}
    >
      {children}
    </button>
  );
}
```

هذا يعمل، لكن من دون أمان أنواع. فالمكوّن الأصل يمكنه تمرير أي شيء إلى الأبناء، وقد لا يتلقّى الأبناء الخصائص التي يتوقّعونها، ولا تتوفّر لدينا أي ضمانات بشأن شكل بياناتنا. لنصلح ذلك.

## بناء مكوّن Menu آمن الأنواع

لنبدأ بمكوّن Menu يوضّح المفاهيم الأساسية. نريد التأكّد من أن مكوّنات MenuItem تتلقّى الخصائص الصحيحة وأن Menu لا يمكن أن يحوي إلا أبناء صالحين.

```typescript
import React, { useState, createContext, useContext } from 'react';

// First, define the shape of our menu item data
interface MenuItemData {
  id: string;
  label: string;
  disabled?: boolean;
}

// Context for sharing state between Menu and MenuItem
interface MenuContextValue {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

// Custom hook to access menu context with proper error handling
function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('MenuItem must be used within a Menu component');
  }
  return context;
}

// Props for the Menu component
interface MenuProps {
  children: React.ReactNode;
  onSelectionChange?: (selectedId: string | null) => void;
  defaultSelected?: string;
}

export function Menu({
  children,
  onSelectionChange,
  defaultSelected = null
}: MenuProps) {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelected);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelectionChange?.(id);
  };

  const contextValue: MenuContextValue = {
    selectedId,
    onSelect: handleSelect,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <div role="menu" className="menu">
        {children}
      </div>
    </MenuContext.Provider>
  );
}

// Props for MenuItem - notice we don't need selectedId or onSelect
// because they come from context
interface MenuItemProps {
  id: string;
  disabled?: boolean;
  children: React.ReactNode;
}

function MenuItem({ id, disabled = false, children }: MenuItemProps) {
  const { selectedId, onSelect } = useMenuContext();

  return (
    <button
      role="menuitem"
      disabled={disabled}
      className={`menu-item ${selectedId === id ? 'selected' : ''}`}
      onClick={() => !disabled && onSelect(id)}
    >
      {children}
    </button>
  );
}

// Attach MenuItem to Menu for dot notation access
Menu.Item = MenuItem;
```

الآن يمكننا استخدام Menu الآمن الأنواع:

```typescript
function App() {
  return (
    <Menu onSelectionChange={(id) => console.log('Selected:', id)}>
      <Menu.Item id="file">File</Menu.Item>
      <Menu.Item id="edit">Edit</Menu.Item>
      <Menu.Item id="view" disabled>
        View
      </Menu.Item>
    </Menu>
  );
}
```

> **ملاحظة**
>
> استخدام React Context يُغني عن الحاجة إلى `React.cloneElement`، وهي قد تسبّب مشكلات مع TypeScript ولا تحافظ على توجيه المراجع (ref forwarding).

## قائمة Menu متقدّمة مع خصائص الخانات

أحيانًا تريد تحكّمًا أكبر في العرض. لنوسّع Menu لدينا ليدعم خصائص التصيير (render props) (المعروفة أيضًا بـ«خصائص الخانات» (slot props) في بعض الأطر):

```typescript
// Extended MenuItem that supports custom rendering
interface MenuItemRenderProps {
  isSelected: boolean;
  isDisabled: boolean;
  select: () => void;
}

interface MenuItemSlotProps extends Omit<MenuItemProps, 'children'> {
  children: (props: MenuItemRenderProps) => React.ReactNode;
}

function MenuItemSlot({ id, disabled = false, children }: MenuItemSlotProps) {
  const { selectedId, onSelect } = useMenuContext();

  const renderProps: MenuItemRenderProps = {
    isSelected: selectedId === id,
    isDisabled: disabled,
    select: () => !disabled && onSelect(id),
  };

  return (
    <div className="menu-item-slot">
      {children(renderProps)}
    </div>
  );
}

Menu.ItemSlot = MenuItemSlot;
```

الآن يمكنك استخدام خصائص التصيير للحصول على تحكّم كامل:

```typescript
<Menu>
  <Menu.ItemSlot id="custom">
    {({ isSelected, isDisabled, select }) => (
      <div className={`custom-item ${isSelected ? 'active' : ''}`} onClick={select}>
        <Icon name="star" />
        Custom Item
        {isSelected && <Badge>Selected</Badge>}
      </div>
    )}
  </Menu.ItemSlot>
</Menu>
```

## بناء مكوّنات Tab آمنة الأنواع

تبقى Tab حالة استخدام ممتازة أخرى للمكوّنات المركّبة. لنبنِ نظام Tab مرنًا:

```typescript
interface TabData {
  id: string;
  title: string;
  disabled?: boolean;
}

interface TabContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabs: TabData[];
  registerTab: (tab: TabData) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within a TabContainer');
  }
  return context;
}

interface TabContainerProps {
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  children: React.ReactNode;
}

export function TabContainer({
  defaultTab,
  onTabChange,
  children
}: TabContainerProps) {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [activeTab, setActiveTab] = useState<string>(defaultTab || '');

  const registerTab = (tab: TabData) => {
    setTabs(current => {
      const exists = current.some(t => t.id === tab.id);
      if (exists) return current;
      return [...current, tab];
    });

    // Set as active if it's the first tab or matches defaultTab
    if (!activeTab || tab.id === defaultTab) {
      setActiveTab(tab.id);
    }
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onTabChange?.(id);
  };

  const contextValue: TabContextValue = {
    activeTab,
    setActiveTab: handleTabChange,
    tabs,
    registerTab,
  };

  return (
    <TabContext.Provider value={contextValue}>
      <div className="tab-container">
        {children}
      </div>
    </TabContext.Provider>
  );
}

// TabList renders the actual tab buttons
function TabList() {
  const { tabs, activeTab, setActiveTab } = useTabContext();

  return (
    <div className="tab-list" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          disabled={tab.disabled}
          aria-selected={activeTab === tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => !tab.disabled && setActiveTab(tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}

interface TabPanelProps {
  id: string;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}

function TabPanel({ id, title, disabled = false, children }: TabPanelProps) {
  const { activeTab, registerTab } = useTabContext();

  // Register this tab on mount
  React.useEffect(() => {
    registerTab({ id, title, disabled });
  }, [id, title, disabled, registerTab]);

  if (activeTab !== id) return null;

  return (
    <div role="tabpanel" className="tab-panel" aria-labelledby={id}>
      {children}
    </div>
  );
}

TabContainer.List = TabList;
TabContainer.Panel = TabPanel;
```

الاستخدام نظيف وتعبيري:

```typescript
function App() {
  return (
    <TabContainer defaultTab="profile" onTabChange={(id) => console.log(id)}>
      <TabContainer.List />

      <TabContainer.Panel id="profile" title="Profile">
        <ProfileForm />
      </TabContainer.Panel>

      <TabContainer.Panel id="settings" title="Settings">
        <SettingsPanel />
      </TabContainer.Panel>

      <TabContainer.Panel id="billing" title="Billing" disabled>
        <BillingInfo />
      </TabContainer.Panel>
    </TabContainer>
  );
}
```

> **نصيحة**
>
> لاحظ كيف يسجّل TabPanel نفسه تلقائيًا لدى الحاوية. هذا يمنع المشكلة الشائعة بإضافة التبويب إلى قائمة التبويبات.

## مكوّنات List عامة مع قيود على العناصر

في مثالنا الأخير، لنبنِ مكوّن List عامًا يمكنه العمل مع أي نوع من البيانات مع الحفاظ على أمان الأنواع:

```typescript
// Generic interface for list items
interface ListItem {
  id: string;
}

interface ListContextValue<T extends ListItem> {
  items: T[];
  selectedIds: Set<string>;
  onToggleItem: (id: string) => void;
  multiSelect: boolean;
}

const ListContext = createContext<ListContextValue<any> | null>(null);

function useListContext<T extends ListItem>() {
  const context = useContext(ListContext) as ListContextValue<T> | null;
  if (!context) {
    throw new Error('List items must be used within a List component');
  }
  return context;
}

interface ListProps<T extends ListItem> {
  items: T[];
  multiSelect?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  children: (item: T) => React.ReactNode;
}

export function List<T extends ListItem>({
  items,
  multiSelect = false,
  onSelectionChange,
  children
}: ListProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const onToggleItem = (id: string) => {
    setSelectedIds(current => {
      const newSet = new Set(current);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!multiSelect) {
          newSet.clear();
        }
        newSet.add(id);
      }

      onSelectionChange?.(Array.from(newSet));
      return newSet;
    });
  };

  const contextValue: ListContextValue<T> = {
    items,
    selectedIds,
    onToggleItem,
    multiSelect,
  };

  return (
    <ListContext.Provider value={contextValue}>
      <div className="list">
        {items.map((item) => (
          <div key={item.id} className="list-item-wrapper">
            {children(item)}
          </div>
        ))}
      </div>
    </ListContext.Provider>
  );
}

// Reusable ListItem component that works with any item type
interface ListItemProps<T extends ListItem> {
  item: T;
  children: (props: {
    item: T;
    isSelected: boolean;
    onToggle: () => void;
  }) => React.ReactNode;
}

function ListItem<T extends ListItem>({ item, children }: ListItemProps<T>) {
  const { selectedIds, onToggleItem } = useListContext<T>();

  return (
    <>
      {children({
        item,
        isSelected: selectedIds.has(item.id),
        onToggle: () => onToggleItem(item.id),
      })}
    </>
  );
}

List.Item = ListItem;
```

الآن يمكنك إنشاء قوائم آمنة الأنواع لأي بيانات:

```typescript
interface User extends ListItem {
  id: string;
  name: string;
  email: string;
}

interface Product extends ListItem {
  id: string;
  title: string;
  price: number;
}

function UserList({ users }: { users: User[] }) {
  return (
    <List items={users} multiSelect>
      {(user) => (
        <List.Item item={user}>
          {({ item, isSelected, onToggle }) => (
            <div className={`user-card ${isSelected ? 'selected' : ''}`} onClick={onToggle}>
              <h3>{item.name}</h3>
              <p>{item.email}</p>
            </div>
          )}
        </List.Item>
      )}
    </List>
  );
}
```

> **تحذير**
>
> كن حذرًا مع السياق العام (generic context). فقد يجد TypeScript صعوبة أحيانًا في الاستنتاج عبر حدود المكوّنات، لذا قد تحتاج إلى تعليقات نوع صريحة.

## المَطبّات الشائعة وحلولها

### المطبّة: تأكيد نوع السياق بشكل خاطئ

```typescript
// ❌ Bad: Unsafe type assertion
const context = useContext(SomeContext) as SomeContextValue;

// ✅ Good: Proper error handling
function useSomeContext() {
  const context = useContext(SomeContext);
  if (!context) {
    throw new Error('useSomeContext must be used within SomeProvider');
  }
  return context;
}
```

### المطبّة: مكوّنات عامة ذات استنتاج ضعيف

```typescript
// ❌ Bad: TypeScript can't infer the type
<List items={products}>
  {(item) => <div>{item.title}</div>} // 'title' might not exist
</List>

// ✅ Good: Explicit type parameter when needed
<List<Product> items={products}>
  {(item) => <div>{item.title}</div>} // TypeScript knows item is Product
</List>
```

### المطبّة: نسيان `readonly` في الخصائص

```typescript
// ❌ Bad: Arrays are mutable
interface ListProps<T> {
  items: T[];
}

// ✅ Good: Readonly arrays prevent accidental mutations
interface ListProps<T> {
  items: readonly T[];
}
```

## اعتبارات الأداء

قد تُنشئ المكوّنات المركّبة أحيانًا إعادة تصيير غير ضرورية. إليك بعض استراتيجيات التحسين:

```typescript
// ✅ Memoize context value to prevent unnecessary re-renders
export function Menu({ children, onSelectionChange }: MenuProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const contextValue = useMemo((): MenuContextValue => ({
    selectedId,
    onSelect: (id: string) => {
      setSelectedId(id);
      onSelectionChange?.(id);
    },
  }), [selectedId, onSelectionChange]);

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
}

// ✅ Memoize expensive child components
const MenuItem = memo(({ id, disabled = false, children }: MenuItemProps) => {
  const { selectedId, onSelect } = useMenuContext();
  // ... component logic
});
```

## حالات الاستخدام الواقعية™

الأنماط التي استكشفناها تعمل بشكل ممتاز بشكل خاص مع:

1. **مكوّنات أنظمة التصميم**: بناء مكتبات يجب أن تعمل مكوّناتها معًا بسلاسة
2. **باني النماذج**: إنشاء نماذج ديناميكية تتشارك فيها مكوّنات الحقول حالة التحقّق
3. **جداول البيانات**: حيث تحتاج مكوّنات الترويسة والجسم والترقيم إلى التنسيق فيما بينها
4. **مكوّنات التنقّل**: مسارات التنقّل (breadcrumbs) والأشرطة الجانبية والقوائم متعدّدة المستويات
5. **أنظمة النوافذ المنبثقة**: حيث تعمل مكوّنات الزر والمحتوى والإجراءات معًا

## الخطوات التالية

أصبح لديك الآن الأدوات لبناء مكوّنات مركّبة متينة مع TypeScript. إليك بعض المجالات التي تستحق الاستكشاف أكثر:

- **توجيه المراجع (ref forwarding)** مع المكوّنات المركّبة باستخدام `forwardRef` و`useImperativeHandle`
- **أنماط الوصول (accessibility)** مثل إدارة التركيز وعلاقات ARIA
- **قيود عامة متقدّمة** باستخدام الأنواع المُخطَّطة (mapped types) والأنواع الشرطية
- **استراتيجيات الاختبار** للمكوّنات المركّبة (تلميح: اختبر السلوك لا التنفيذ)

تمنحك المكوّنات المركّبة مع TypeScript أفضل ما في العالمين: واجهات برمجية مرنة وقابلة لإعادة الاستخدام تمنع أخطاء وقت التشغيل وتقدّم تجربة تطوير ممتازة. ابدأ بهذه الأنماط وعدّلها لتناسب حالات الاستخدام لديك — وستشكرك نسختك المستقبلية من نفسك (وزملاؤك).
