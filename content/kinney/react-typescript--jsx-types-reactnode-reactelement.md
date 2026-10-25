---
title: "أنواع JSX: ReactNode وReactElement"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/jsx-types-reactnode-reactelement"
---

قد تكون العناصر الفرعية (children) في React أي شيء تقريبًا: نصوصًا أو أرقامًا أو عناصر JSX أو مصفوفات عناصر أو أجزاءً (fragments) أو حتى `null`. لكن حين تكتب TypeScript، فكيف تكتب نوع خاصية `children` دون أن تكسر نصف حالات الاستخدام أو تكون متساهلًا أكثر من اللازم؟

المفتاح يكمن في فهم ثلاثة أنواع أساسية: `ReactNode` و`ReactElement` و`JSX.Element`. قد تبدو متشابهة، لكن اختيار الخطأ منها سيكسر مرونة مكوّنك أو يمنح مستهلكيه رسائل خطأ نوعية مربكة. وما إن تفهم تسلسلها الهرمي وغرضها حتى لا تشكّ في خصائص العناصر الفرعية مرة أخرى.

## الصورة الكبيرة

قبل الغوص في التفاصيل، إليك النموذج الذهني الذي تحتاجه:

- **`ReactNode`**: أي شيء يستطيع React تصييره (الأوسع تسامحًا)
- **`ReactElement`**: ناتج تعبيرات JSX (الخيار الوسط)
- **`JSX.Element`**: تمثيل TypeScript الخاص بتعبيرات JSX (الأضيق)

في أغلب الأوقات، ستستخدم `ReactNode` لخصائص العناصر الفرعية، و`ReactElement` أو `JSX.Element` لأنواع عائدات المكوّنات. لكن دعنا نرِ لماذا.

## ReactNode: السكين السويسري

`ReactNode` هو أوسع الأنواع تسامحًا — إذ يمثّل أي شيء يستطيع React تصييره. ويشمل ذلك النصوص والأرقام والعناصر والمصفوفات والأجزاء، وحتى `null` أو `undefined`.

```typescript
type ReactNode =
  ReactElement | string | number | Iterable<ReactNode> | ReactPortal | boolean | null | undefined;
```

هذا يجعله مثاليًا لكتابة نوع خصائص `children`، لأن الآباء غالبًا يحتاجون إلى قبول مجموعة واسعة من المحتويات:

```typescript
// ✅ Good: ReactNode accepts anything renderable
interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

// All of these work:
<Card>Hello world</Card>
<Card>{42}</Card>
<Card><Button>Click me</Button></Card>
<Card>{[<span key="1">Item 1</span>, <span key="2">Item 2</span>]}</Card>
<Card>{null}</Card>
```

قارن هذا بالبدائل الأكثر تقييدًا:

```typescript
// ❌ Too restrictive: only accepts JSX elements
interface CardProps {
  children: ReactElement;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

// Type errors!
<Card>Hello world</Card> // ❌ string not assignable to ReactElement
<Card>{42}</Card>         // ❌ number not assignable to ReactElement
<Card>{null}</Card>       // ❌ null not assignable to ReactElement
```

> **نصيحة**
>
> عند الشك في خصائص العناصر الفرعية، استخدم `ReactNode`. فهو يمنح مستهلكي المكوّن أقصى قدر من المرونة مع ضمان أمان الأنواع في الوقت نفسه.

## أنماط العناصر الفرعية في العالم الحقيقي

الآن بعد أن فهمت `ReactNode`، دعنا نطّلع على أكثر أنماط العناصر الفرعية شيوعًا التي ستصادفها، وكيف تُكتَب أنواعها بشكل صحيح.

### الحاوية الأساسية

تحتاج معظم مكوّنات التفاف إلى قبول أي محتوى قابل للتصيير:

```typescript
interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div className={`card ${className || ''}`}>
      {children}
    </div>
  );
}

// All of these just work:
<Card>Simple text</Card>
<Card><h1>Title</h1><p>Content</p></Card>
<Card>{user ? <Profile user={user} /> : 'Please log in'}</Card>
<Card>{items.map(item => <Item key={item.id} item={item} />)}</Card>
```

### العناصر الفرعية الاختيارية

أحيانًا تكون العناصر الفرعية اختيارية، وتريد عندها تصيير عناصر التفاف شرطيًا:

```typescript
interface SectionProps {
  title: string;
  children?: ReactNode; // Optional children
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children && <div className="content">{children}</div>}
    </section>
  );
}

// Both of these work:
<Section title="Empty section" />
<Section title="With content">
  <p>Some content here</p>
</Section>
```

### خانات متعدّدة للعناصر الفرعية

تستخدم أنماط React الحديثة غالبًا «خانات» متعدّدة لأنواع مختلفة من المحتوى:

```typescript
interface LayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

function Layout({ header, sidebar, children, footer }: LayoutProps) {
  return (
    <div className="layout">
      <header>{header}</header>
      <div className="main">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Usage allows maximum flexibility:
<Layout
  header={<Navigation />}
  sidebar="Simple text sidebar"
  footer={null} // Explicitly no footer
>
  <Article />
</Layout>;
```

### دوال التصيير مع العناصر الفرعية

حين تبني مكوّنات تستخدم دوال التصيير (render props)، تُبقي `ReactNode` الأمور مرنة:

```typescript
interface DataFetcherProps {
  url: string;
  children: (data: any, loading: boolean) => ReactNode;
}

function DataFetcher({ url, children }: DataFetcherProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return <>{children(data, loading)}</>;
}

// The render function can return anything renderable:
<DataFetcher url="/api/users">
  {(users, loading) => {
    if (loading) return 'Loading...';
    if (!users) return null;
    return users.map((user) => <UserCard key={user.id} user={user} />);
  }}
</DataFetcher>;
```

### التصيير الشرطي للعناصر الفرعية

من أكثر الأنماط شيوعًا هو تصيير العناصر الفرعية شرطًا استنادًا إلى الحالة:

```typescript
interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapsible">
      <button onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▼' : '▶'}
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
}

// Works with any content that might be conditionally hidden:
<Collapsible title="Advanced Options">
  <form>
    <input type="text" placeholder="Advanced setting" />
    <button type="submit">Save</button>
  </form>
</Collapsible>;
```

## التعامل مع العناصر الفرعية: دوال مساعدة من React

حين تحتاج إلى معالجة العناصر الفرعية أو فحصها، يوفّر React عدة دوال مساعدة. إليك كيفية استخدامها مع كتابة أنواع TypeScript صحيحة:

### React.Children.map

حين تحتاج إلى تحويل كل عنصر فرعي:

```typescript
import { ReactNode, cloneElement, isValidElement } from 'react';

interface WrapperProps {
  children: ReactNode;
}

function AddClassToChildren({ children }: WrapperProps) {
  return (
    <div>
      {React.Children.map(children, (child, index) => {
        // Type guard to ensure we have a valid React element
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: `${child.props.className || ''} wrapped-${index}`.trim(),
          });
        }
        // Return non-element children (strings, numbers) unchanged
        return child;
      })}
    </div>
  );
}
```

### React.Children.count

يعدّ العناصر الفرعية القابلة للتصيير (يتجاهل `null` و`undefined` والقيم المنطقية):

```typescript
interface ListProps {
  children: ReactNode;
  showCount?: boolean;
}

function List({ children, showCount }: ListProps) {
  const count = React.Children.count(children);

  return (
    <ul>
      {showCount && <li className="count">Total items: {count}</li>}
      {React.Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}
```

### React.Children.only

حين تحتاج إلى عنصر فرعي واحد بالضبط:

```typescript
interface SingleChildProps {
  children: ReactNode;
}

function SingleChildWrapper({ children }: SingleChildProps) {
  // This will throw if children is not exactly one element
  const singleChild = React.Children.only(children);

  if (isValidElement(singleChild)) {
    return cloneElement(singleChild, {
      className: `${singleChild.props.className || ''} enhanced`.trim()
    });
  }

  return singleChild;
}

// ✅ Works:
<SingleChildWrapper>
  <Button>Click me</Button>
</SingleChildWrapper>

// ❌ Throws error (multiple children):
<SingleChildWrapper>
  <Button>One</Button>
  <Button>Two</Button>
</SingleChildWrapper>
```

### حرّاس الأنواع للعناصر الفرعية

أحيانًا تحتاج إلى التمييز بين أنواع مختلفة من العناصر الفرعية:

```typescript
function isReactElement(child: ReactNode): child is ReactElement {
  return isValidElement(child);
}

function isStringChild(child: ReactNode): child is string {
  return typeof child === 'string';
}

interface SmartListProps {
  children: ReactNode;
}

function SmartList({ children }: SmartListProps) {
  return (
    <ul>
      {React.Children.map(children, (child, index) => {
        if (isStringChild(child)) {
          return (
            <li key={index} className="text-item">
              {child}
            </li>
          );
        }

        if (isReactElement(child)) {
          return (
            <li key={index} className="element-item">
              {child}
            </li>
          );
        }

        // Handle other types (numbers, etc.)
        return (
          <li key={index} className="other-item">
            {String(child)}
          </li>
        );
      })}
    </ul>
  );
}
```

> **تحذير**
>
> كن حذرًا مع `React.Children.only` — فهو يرمي خطأً إن لم يكن لديك عنصر فرعي واحد بالضبط. استخدمه دائمًا حين تحتاج إلى هذا القيد تحديدًا، لا كمعالج عام للعناصر الفرعية.

## ReactElement: ناتج JSX

يمثّل `ReactElement` الكائنات التي تنشئها تعبيرات JSX — أي عقد DOM الافتراضية التي يستخدمها React داخليًا. وهو أكثر تحديدًا من `ReactNode` وأكثر مرونة من `JSX.Element`.

```typescript
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>,
> {
  type: T;
  props: P;
  key: Key | null;
}
```

ستستخدم `ReactElement` عادةً حين تحتاج إلى التأكد من أنك تحصل على عنصر حقيقي (وليس نصًا أو رقمًا)، مع رغبتك في قبول أي نوع من العناصر:

```typescript
interface IconButtonProps {
  icon: ReactElement;
  label: string;
}

function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button>
      {icon}
      <span>{label}</span>
    </button>
  );
}

// ✅ Works with any JSX element
<IconButton icon={<HomeIcon />} label="Home" />
<IconButton icon={<div>📁</div>} label="Folder" />

// ❌ Doesn't work with strings or numbers
<IconButton icon="🏠" label="Home" /> // Type error
```

وهذا مفيد بشكل خاص مع خانات المكوّنات أو حين تحتاج إلى نسخ العناصر أو معالجتها:

```typescript
interface ModalProps {
  trigger: ReactElement;
  children: ReactNode;
}

function Modal({ trigger, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // We can clone the trigger and add props because it's a ReactElement
  const triggerWithClick = cloneElement(trigger, {
    onClick: () => setIsOpen(true),
  });

  return (
    <>
      {triggerWithClick}
      {isOpen && (
        <div className="modal">
          {children}
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </>
  );
}

// Usage:
<Modal trigger={<Button>Open Modal</Button>}>
  <p>Modal content here</p>
</Modal>;
```

## ReactElement مقابل JSX.Element مقابل ReactNode: الصورة الكاملة

الآن بعد أن فهمت الأساسيات، دعنا نتعمّق في متى ولماذا تختار كل نوع. هذه الأنواع الثلاثة تشكّل تسلسلًا هرميًا، ومعرفة فروقها الدقيقة ستجعلك مستخدمًا متقدمًا لـ TypeScript مع React.

### JSX.Element: موقف TypeScript

`JSX.Element` هو نوع TypeScript الخاص بتعبيرات JSX. وهو في الأساس اسم بديل (alias) لـ `ReactElement<any, any>`، لكنه ما يستنتجه TypeScript حين تكتب JSX:

```typescript
// TypeScript infers JSX.Element for these expressions:
const element1 = <div>Hello</div>; // JSX.Element
const element2 = <Button>Click</Button>; // JSX.Element
```

الفكرة المفتاحية: `JSX.Element` هو تمثيل TypeScript، بينما `ReactElement` هو تمثيل React. الاثنان متطابقان تقريبًا، لكن `JSX.Element` له قيد جوهري:

```typescript
// JSX.Element is always ReactElement<any, any>
type JSXElement = ReactElement<any, any>;

// This means JSX.Element loses generic type information:
function createTypedElement(): ReactElement<{ label: string }> {
  return <button>Click</button>; // Preserves prop types
}

function createJSXElement(): JSX.Element {
  return <button>Click</button>; // Props become 'any'
}
```

### ReactElement: الحل الوسط

يمثّل `ReactElement` الكائنات التي تنشئها تعبيرات JSX — أي عقد DOM الافتراضية التي يستخدمها React داخليًا. وهو أكثر تحديدًا من `ReactNode` وأكثر مرونة من `JSX.Element`:

```typescript
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>,
> {
  type: T;
  props: P;
  key: Key | null;
}

// ReactElement can preserve type information
const typedElement: ReactElement<ButtonProps> = <Button variant="primary">Click</Button>;

// You can extract props from a ReactElement
type ExtractedProps = typeof typedElement.props; // ButtonProps
```

### التسلسل الهرمي للأنواع

إليك العلاقة الجوهرية التي ينبغي فهمها:

```typescript
// ReactNode is the superset of everything React can render
type ReactNode =
  | ReactElement // ← This includes JSX.Element
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined;

// JSX.Element is a specific ReactElement
type JSXElement = ReactElement<any, any>;

// The hierarchy:
// ReactNode > ReactElement > JSX.Element
```

### متى تستخدم كل نوع: شجرة قرار

```typescript
// Question 1: Are you typing children props?
// → Use ReactNode (99% of cases)
interface ContainerProps {
  children: ReactNode; // ✅ Maximum flexibility
}

// Question 2: Do you need to clone or inspect the element?
// → Use ReactElement
interface ModalProps {
  trigger: ReactElement; // ✅ Can clone and add props
  children: ReactNode; // ✅ Just rendering
}

function Modal({ trigger, children }: ModalProps) {
  // Can safely clone because trigger is ReactElement
  const enhancedTrigger = cloneElement(trigger, {
    onClick: () => setOpen(true),
  });

  return (
    <>
      {enhancedTrigger}
      {children}
    </>
  );
}

// Question 3: Are you constraining return types?
// → Let TypeScript infer or use ReactNode for conditionals
function ConditionalComponent({ show }: { show: boolean }): ReactNode {
  if (!show) return null; // ✅ ReactNode allows null
  return <div>Content</div>;
}

// Question 4: Do you need specific prop types preserved?
// → Use ReactElement with generics
function processElement(element: ReactElement<{ className?: string }>) {
  // TypeScript knows element.props has className
  const className = element.props.className || 'default';
  return cloneElement(element, { className: `${className} processed` });
}
```

### مثال من العالم الحقيقي: خانات مكوّنات آمنة من ناحية الأنواع

إليك نمطًا يوضّح الفروق العملية:

````typescript
interface LayoutProps {
  // ReactNode: Just render as-is
  header: ReactNode;
  footer: ReactNode;

  // ReactElement: Need to manipulate
  sidebar: ReactElement;

  // Specific ReactElement: Type-safe props
  navigation: ReactElement<{ isActive?: boolean }>;

  // Main content
  children: ReactNode;
}

function Layout({ header, footer, sidebar, navigation, children }: LayoutProps) {
  // Can render ReactNode directly
  const headerContent = header; // Could be string, element, null, etc.

  // Can clone and enhance ReactElement
  const enhancedSidebar = cloneElement(sidebar, {
    className: 'layout-sidebar'
  });

  // Can access specific props on typed ReactElement
  const navWithHighlight = cloneElement(navigation, {
    isActive: true,
    className: navigation.props.isActive ? 'nav-active' : 'nav'
  });

  return (
    <div>
      <header>{headerContent}</header>
      <nav>{navWithHighlight}</nav>
      <aside>{enhancedSidebar}</aside>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

## The Building Blocks: ReactChild, ReactFragment, and ReactPortal

While `ReactNode` is the umbrella type for everything React can render, it's actually composed of several more specific types. Understanding these building blocks helps you write more precise types when needed and debug type errors more effectively.

### ReactChild: The Simple Renderable

`ReactChild` represents the simplest things React can render—individual primitive values or elements:

```tsx
// ReactChild is a union of the basic renderable units
type ReactChild = ReactElement | string | number;

// These are all valid ReactChild values:
const textChild: ReactChild = "Hello World";
const numberChild: ReactChild = 42;
const elementChild: ReactChild = <div>Content</div>;

// But these are NOT ReactChild:
const nullChild: ReactChild = null;        // ❌ Not included
const arrayChild: ReactChild = [1, 2, 3];  // ❌ Arrays not included
const boolChild: ReactChild = true;        // ❌ Booleans not included
````

> **ملاحظة**
>
> صار `ReactChild` مهملًا (deprecated) في أنواع React الأحدث. ينبغي أن تستخدم `ReactNode` أو أن تكون أكثر تحديدًا باستخدام `ReactElement | string | number` بدلًا منه.

### ReactFragment: المصفوفات والعناصر الفرعية ذات المفاتيح

يمثّل `ReactFragment` قدرة React على تصيير عدة عناصر فرعية دون عنصر التفاف:

```typescript
// ReactFragment represents grouped children
type ReactFragment = Iterable<ReactNode>;

// Using fragments in practice
function ItemList({ items }: { items: string[] }) {
  // Explicit fragment with key
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <dt>{item}</dt>
          <dd>Description of {item}</dd>
        </React.Fragment>
      ))}
    </>
  );
}

// ReactFragment in component props
interface ListProps {
  // When you specifically need an array of nodes
  items: ReactFragment;
  // vs ReactNode which could be a single item
  header: ReactNode;
}

function List({ items, header }: ListProps) {
  return (
    <div>
      <h2>{header}</h2>
      <ul>
        {React.Children.map(items, (item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

الفرق الأساسي: `ReactFragment` مخصّص للمجموعات، بينما `ReactNode` قد يكون عنصرًا مفردًا أو مجموعة:

```typescript
// ReactNode: Single item OR array
const node1: ReactNode = 'Single string';
const node2: ReactNode = ['Array', 'of', 'strings'];

// ReactFragment: Always represents a collection
const fragment1: ReactFragment = ['Array', 'of', 'items'];
const fragment2: ReactFragment = new Set([1, 2, 3]); // Any iterable works
```

### ReactPortal: التصيير خارج الشجرة

`ReactPortal` هو النوع الذي تعيده `ReactDOM.createPortal`، ويتيح لك تصيير العناصر الفرعية داخل شجرة DOM مختلفة:

```typescript
import { createPortal } from 'react-dom';
import type { ReactPortal, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
}

function Modal({ children, isOpen }: ModalProps): ReactPortal | null {
  if (!isOpen) return null;

  // createPortal returns a ReactPortal
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById('modal-root')!,
  );
}

// When you need to type portal-specific behavior
function PortalManager({ portals }: { portals: ReactPortal[] }) {
  // ReactPortal has specific properties
  return (
    <>
      {portals.map((portal) => {
        // Each portal has key, children, containerInfo
        console.log('Portal container:', portal.containerInfo);
        return portal;
      })}
    </>
  );
}
```

### فهم نوع ReactNode الاتحادي الكامل

الآن يمكنك أن ترى كيف يُبنى `ReactNode` من هذه القطع:

```typescript
// The full ReactNode type decomposed
type ReactNode =
  | ReactElement     // JSX elements
  | string          // Text nodes
  | number          // Numeric values
  | Iterable<ReactNode>  // Arrays and fragments (includes ReactFragment)
  | ReactPortal     // Portal nodes
  | boolean         // Conditionals (rendered as nothing)
  | null            // Absence of content
  | undefined;      // Undefined values

// This is why ReactNode is so flexible:
function FlexibleComponent({ content }: { content: ReactNode }) {
  // content could be ANY of the above types
  return <div>{content}</div>;
}

// All of these work:
<FlexibleComponent content="text" />
<FlexibleComponent content={42} />
<FlexibleComponent content={<span>element</span>} />
<FlexibleComponent content={[1, 2, 3]} />
<FlexibleComponent content={createPortal(<div />, document.body)} />
<FlexibleComponent content={null} />
<FlexibleComponent content={true && <div>Conditional</div>} />
```

### متى تستخدم هذه الأنواع المحددة

بينما ستستخدم `ReactNode` في 95% من الوقت، فإن معرفة هذه الأنواع المحددة تساعد في سيناريوهات بعينها:

```typescript
// When you're building a table and need pairs
interface TableRowProps {
  // Ensures we get an array, not a single element
  cells: ReactFragment;
}

// When handling portal-specific logic
interface OverlayManagerProps {
  // Specifically portal elements
  overlays: ReactPortal[];
  // Regular children
  children: ReactNode;
}

// When you need to exclude certain types
type TextOnly = Extract<ReactNode, string | number>;

interface TextDisplayProps {
  // Only accepts text or numbers, not elements
  content: TextOnly;
}

function TextDisplay({ content }: TextDisplayProps) {
  // TypeScript knows content is string | number
  return <span className="text-only">{String(content)}</span>;
}
```

> **نصيحة**
>
> عمليًا، التزم بـ `ReactNode` ما لم يكن لديك سبب محدد لتكون أكثر تقييدًا. فهذه الأنواع المحددة مفيدة أساسًا لمؤلفي المكتبات أو حين تبني مكوّنات شديدة التخصص.

## إرشادات من العالم الحقيقي

إليك كيفية الاختيار بين هذه الأنواع في السيناريوهات الشائعة:

### خصائص العناصر الفرعية: ReactNode في أغلب الحالات

```typescript
// ✅ Good: Flexible children prop
interface Props {
  children: ReactNode;
}

// ❌ Too restrictive for most use cases
interface Props {
  children: ReactElement;
}
```

### دوال التصيير: ReactNode عادةً

```typescript
interface Props {
  renderHeader: () => ReactNode; // ✅ Flexible
  renderFooter: () => JSX.Element; // ❌ Too restrictive
}

function Layout({ renderHeader, renderFooter }: Props) {
  return (
    <div>
      <header>{renderHeader()}</header>
      <main>Content</main>
      <footer>{renderFooter()}</footer>
    </div>
  );
}

// With ReactNode, both of these work:
<Layout
  renderHeader={() => 'Simple string header'}
  renderFooter={() => <div>Complex footer</div>}
/>;
```

### خصائص العناصر: ReactElement حين تحتاج إلى المعالجة

```typescript
interface Props {
  // Use ReactElement when you need to clone or inspect the element
  trigger: ReactElement;
  // Use ReactNode when you just need to render it
  icon: ReactNode;
}

function Dropdown({ trigger, icon }: Props) {
  // Can clone trigger because it's guaranteed to be an element
  const enhancedTrigger = cloneElement(trigger, {
    'aria-expanded': isOpen,
  });

  return (
    <div>
      {icon} {/* Just render the icon */}
      {enhancedTrigger}
    </div>
  );
}
```

### أنواع عائدات المكوّنات: دع TypeScript يستنتج

```typescript
// ✅ Let TypeScript infer JSX.Element
function Button() {
  return <button>Click me</button>;
}

// ⚠️ Explicit typing usually unnecessary
function Button(): JSX.Element {
  return <button>Click me</button>;
}

// ✅ Explicit typing when returning conditional content
function ConditionalButton({ show }: { show: boolean }): ReactNode {
  if (!show) return null;
  return <button>Click me</button>;
}
```

## الأخطاء الشائعة والحلول

### الخطأ 1: استخدام ReactElement للعناصر الفرعية

```typescript
// ❌ This breaks with strings, numbers, arrays
interface Props {
  children: ReactElement;
}

// ✅ Use ReactNode instead
interface Props {
  children: ReactNode;
}
```

### الخطأ 2: نسيان التصيير الشرطي

```typescript
// ❌ This can return null, but JSX.Element doesn't allow it
function ConditionalComponent({ show }: { show: boolean }): JSX.Element {
  if (!show) return null; // Type error!
  return <div>Visible</div>;
}

// ✅ Use ReactNode for conditional rendering
function ConditionalComponent({ show }: { show: boolean }): ReactNode {
  if (!show) return null;
  return <div>Visible</div>;
}
```

### الخطأ 3: تقييد دوال التصيير أكثر من اللازم

```typescript
// ❌ Too restrictive—breaks with conditional rendering
interface Props {
  renderItem: (item: Item) => JSX.Element;
}

// ✅ More flexible
interface Props {
  renderItem: (item: Item) => ReactNode;
}
```

## شجرة قرار لكتابة أنواع العناصر الفرعية

إليك دليلك المعتمد لكتابة أنواع العناصر الفرعية والخصائص المرتبطة بها:

**لخصائص العناصر الفرعية (95% من الحالات):**

```typescript
// ✅ Almost always correct
interface Props {
  children: ReactNode;
}
```

**حين تكون العناصر الفرعية اختيارية:**

```typescript
// ✅ Use optional ReactNode
interface Props {
  children?: ReactNode;
}
```

**حين تحتاج إلى معالجة العناصر الفرعية:**

```typescript
// ✅ Use ReactNode, then type-guard with isValidElement
interface Props {
  children: ReactNode;
}

function MyComponent({ children }: Props) {
  return React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      // Now you can safely use cloneElement, etc.
      return cloneElement(child, {/* additional props */});
    }
    return child;
  });
}
```

**لدوال خاصية التصيير:**

```typescript
// ✅ Return ReactNode for maximum flexibility
interface Props {
  render: (data: Data) => ReactNode;
}
```

**لخصائص العناصر تحديدًا (نادرة):**

```typescript
// ✅ Only when you specifically need an element
interface Props {
  trigger: ReactElement; // Will be cloned/enhanced
  children: ReactNode; // Will be rendered as-is
}
```

## الخلاصة النهائية

حين تكتب أنواع العناصر الفرعية، فكّر بهذا الترتيب:

1. **ابدأ بـ `ReactNode`** — فهو يتعامل مع 95% من حالات الاستخدام بشكل صحيح
2. **فكّر في `ReactElement`** فقط حين تحتاج إلى معالجة العنصر (نسخه، فحص خصائصه، إلخ)
3. **تجنّب `JSX.Element`** للعناصر الفرعية — فهو مقيّد أكثر من اللازم ولا يقدّم أي إضافة

بُني نظام React على المرونة والتركيب. وينبغي أن تعكس كتابتك لأنواعك هذه الفلسفة. حين تستخدم `ReactNode` للعناصر الفرعية، فأنت تتيح للمستهلكين تمرير نصوص أو عناصر أو مصفوفات أو محتوى شرطي أو حتى `null` — وهو بالضبط ما صُمم React للتعامل معه.

لا تبالغ في التفكير: إن كان الاسم `children` ويقع بين وسمَي JSX، فاكتب نوعه `ReactNode`. وسيشكرَك مستقبلك (ومستخدمو مكوّنك) على هذه المرونة.
