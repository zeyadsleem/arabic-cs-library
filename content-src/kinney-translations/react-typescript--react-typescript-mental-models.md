---
title: "النماذج الذهنية لـ React مع TypeScript"
---

سر إتقان React مع TypeScript ليس حفظ توقيع كل خُطّاف (hook) أو قيد كل نوع عام (generic)، بل بناء النماذج الذهنية الصحيحة. حين تفهم كيف تتحوّل JSX إلى استدعاءات دوال، ولماذا تختفي الأنواع عند وقت التشغيل، وكيف يصبح TypeScript توثيقًا للتصميم، تتّضح كل بقيّة الأمور من تلقاء نفسها.

لنبُنِ هذه النماذج الذهنية من القاع، بدءًا من التحول الأساسي الذي يغيّر طريقة تفكيرك في مكوّنات React (components) إلى الأبد.

## JSX ليست إلا استدعاءات دوال

هذه الحقيقة التي تغيّر كل شيء: JSX ليست وسومًا سحرية، بل هي سكر نحوي (syntactic sugar) لاستدعاءات دوال. حين تستوعب هذا، تبدأ مكوّنات React في أن تصبح مفهومة بطريقة جديدة كليًا.

```typescript
// ✅ This JSX...
const element = <div className="container">Hello, world!</div>;

// ✅ ...becomes this function call
const element = React.createElement('div', { className: 'container' }, 'Hello, world!');
```

يشرح هذا النموذج الذهني لماذا يمكنك فعل أشياء تبدو مستحيلة مع HTML:

```typescript
// ✅ You can store JSX in variables (because it's just function return values)
const greeting = <h1>Hello!</h1>;

// ✅ You can pass JSX as props (because it's just values)
const Modal = ({ children }: { children: React.ReactNode }) => (
  <div className="modal">{children}</div>
);

// ✅ You can return JSX from functions (because functions can return values)
const getWelcomeMessage = (isLoggedIn: boolean) => {
  return isLoggedIn ? <Welcome /> : <Login />;
};
```

### المكوّنات ليست إلا دوال

بما أن JSX تُترجَم إلى استدعاءات دوال، فمكوّنات React حرفيًا دوال تُعيد ما تتوقعه `React.createElement`:

```typescript
// ✅ A component is a function that returns JSX
function UserProfile({ name, email }: { name: string; email: string }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// ✅ Which means you can call it like any function
const profile = UserProfile({ name: 'Alice', email: 'alice@example.com' });
```

لهذا تعمل الخصائص (props) على النحو الذي تعمل به — فهي مجرّد وسائط دوال. ولذلك يستطيع TypeScript أن يمنحك تلميحات IntelliSense دقيقة للغاية: فهو يعرف تمامًا ما تتوقعه كل دالة من وسائط.

## واقع وقت التصريف مقابل وقت التشغيل

توجد أنواع TypeScript في عالم موازٍ يختفي عند تشغيل شيفرتك. يخلق هذا ثنائيةً عجيبة تُحيّر مطوّرين كثيرين، لكن حين تفهمها ستكتب شيفرة React أفضل.

### الأنواع تختفي عند وقت التشغيل

```typescript
// ✅ At compile time, TypeScript knows about these types
interface User {
  id: number;
  name: string;
  email: string;
}

function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>;
}

// ❌ At runtime, there's no User interface—it's gone!
// This compiled JavaScript has no type information:
function UserCard({ user }) {
  return React.createElement('div', null, user.name);
}
```

لهذا تحتاج إلى تحقّقٍ وقت التشغيل (runtime validation) للبيانات الخارجية:

```typescript
// ❌ TypeScript can't protect you from bad API data
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data; // TypeScript says this is a User, but what if it's not?
};

// ✅ Runtime validation bridges the gap
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return UserSchema.parse(data); // Now we're safe!
};

type User = z.infer<typeof UserSchema>;
```

### خصائص المكوّنات تعيش في العالمين

الخصائص ممتعة لأنها موجودة عند وقت التصريف (من أجل TypeScript) وعند وقت التشغيل (من أجل React):

```typescript
// ✅ Compile-time: TypeScript enforces the contract
interface ButtonProps {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({ variant, disabled = false, onClick }: ButtonProps) {
  // ✅ Runtime: JavaScript receives actual values
  const className = `btn btn--${variant}`;

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      Click me
    </button>
  );
}
```

## الأنواع بوصفها توثيقًا للتصميم

أفضل شيفرة React مع TypeScript تعامل أنواعَها بوصفها توثيقًا للتصميم قابلًا للتنفيذ. يجب أن تروي أنواعك قصة غرض مكوّنك وقيوده وعلاقاته.

### أنواع تروي القصة

```typescript
// ❌ Vague types that don't communicate intent
interface Props {
  data: any[];
  loading: boolean;
  error: string | null;
}

// ✅ Types that document your design decisions
interface UserListProps {
  /** The users to display. Empty array shows "no users" message. */
  users: User[];
  /** Whether we're currently fetching users from the API */
  isLoading: boolean;
  /** Error message to display if user fetching failed */
  fetchError: string | null;
  /** Called when user clicks on a user card */
  onUserSelect: (userId: User['id']) => void;
}
```

## حلقة التغذية الراجعة بين TypeScript وReact

أقوى جانب في العمل بـ React مع TypeScript هو حلقة التغذية الراجعة الوثيقة بين أنواعك وتنفيذك. يبثّ التغيير في موضعٍ واحد أثره عبر شيفرتك كاملةً، فيلتقط الأخطاء قبل أن تتحوّل إلى عللًا (bugs).

### إعادة البناء بثقة

عندما تغيّر واجهةً، يُظهر لك TypeScript كل موضعٍ يحتاج إلى تحديث:

```typescript
// ✅ Before: Simple user interface
interface User {
  id: number;
  name: string;
}

// ✅ After: Add email field
interface User {
  id: number;
  name: string;
  email: string; // TypeScript will now error everywhere this is missing
}

// ✅ TypeScript forces you to update all usage sites
function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p> {/* Had to add this */}
    </div>
  );
}
```

### الأنواع توجّه التنفيذ

يمكن للأنواع المصمّمة بعناية أن توجّهك نحو بنية مكوّنات أفضل:

```typescript
// ✅ This type suggests a clear separation of concerns
interface ProductProps {
  product: Product;
  displayMode: 'card' | 'list' | 'grid';
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
}

// ✅ The implementation naturally follows the type structure
function ProductItem({ product, displayMode, onAddToCart, onToggleWishlist }: ProductProps) {
  const handleAddToCart = () => onAddToCart(product.id);
  const handleToggleWishlist = () => onToggleWishlist(product.id);

  const baseClasses = 'product-item';
  const modeClasses = `product-item--${displayMode}`;

  return (
    <div className={`${baseClasses} ${modeClasses}`}>
      {/* Implementation guided by the type contract */}
    </div>
  );
}
```

## تجميع كل شيء

تعمل هذه النماذج الذهنية معًا لخلق تجربة تطوير قوية. فهمُ JSX بوصفها استدعاءات دوال يساعدك في فهم تركيب المكوّنات. والوعي بالفرق بين وقت التصريف ووقت التشغيل يبقيك آمنًا أمام البيانات الخارجية. والأنواع بوصفها توثيقًا تجعل شيفرتك تشرح نفسها بنفسها. وتحسينات React 19 تجعل كل شيء أكثر سلاسة. وحلقة التغذية الراجعة تساعدك في بناء برمجيات أفضل.

الفكرة الأساسية هي أن TypeScript مع React لا يضيفان تعقيدًا، بل يكشفان تعقيدًا كان موجودًا بالفعل ويمنحانك أدوات لإدارته بأسلوب منهجي. حين تستوعب هذه النماذج الذهنية ستجد نفسك تكتب مكوّنات أيسر فهمًا وتعديلًا وتصحيحًا (debug). وجمال النماذج الذهنية أنها تتضاعف أثرها؛ فكل نموذج تستوعبه يجعل النموذج الذي بعده أسهل إدراكًا، حتى تلاحظ فجأة أنك تفكر بـ React مع TypeScript بطلاقة — وتتساءل كيف سبق لك أن بنيتَ واجهات المستخدم بطريقة أخرى.
