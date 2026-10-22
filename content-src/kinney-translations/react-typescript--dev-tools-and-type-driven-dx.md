---
title: "أدوات المطوّر والتجربة المدفوعة بالأنواع"
---

بناء تطبيقات React ممتع. أما تصحيحها (debugging)؟ ليس كثيرًا. لكن ماذا لو استطاعت أنواع TypeScript لديك أن تجعل تجربة أدوات المطوّر (Developer Tools) ممتعة فعلًا؟ سنتكشف كيف نستثمر TypeScript لنصنع تجربة تطوير لا تُخطئ فيها الأنواع الأخطاء فحسب—بل تساعدك نشطًا على التصحيح، وفهم علاقات المكوّنات (components)، وتفسير تحوّلات الحالة المعقّدة في الوقت الحقيقي.

عند نهاية هذه الصفحة، ستعرف كيف تستخدم TypeScript لترسم أدوات المطوّر قصةً عن حالة تطبيقك، وأنشئ أسماء مكوّنات ذات معنى تصمد أمام التصغير (minification)، وتبني أدوات تصحيح تفهم نماذج النطاق (domain models) كما تفهمها أنت.

## مشكلة أدوات المطوّر العامة

أدوات المطوّر في React عظيمة، لكنها أيضًا عامة. فهي تريك أشجار المكوّنات، والخصائص (props)، والحالة—لكنها لا تفهم منطق عملك. وحين تصحّح مسار الدفع في متجر إلكتروني معقّد، فإن رؤية `Component` بخصائص `{data: {...}, onClick: f}` لا تخبرك كثيرًا عمّا إذا كان ما تنظر إلى بطاقة منتج، أم نموذج دفع، أم مُنتقي شحن.

هذا ما نراه عادةً في أدوات المطوّر:

```typescript
// ❌ What Developer Tools shows us
<Component>
  <div>
    <Component data={[...]} />
    <Component onClick={f} />
  </div>
</Component>
```

وهذا ما نتمنّى أن نراه:

```typescript
// ✅ What we want to see
<ProductListing>
  <ProductGrid>
    <ProductCard product={...} />
    <AddToCartButton onAddToCart={f} />
  </ProductGrid>
</ProductListing>
```

والخبر السارّ؟ يمنحنا TypeScript الأدوات لسدّ هذه الفجوة.

## أسماء عرض للمكوّنات تعين حقًا

أولًا: لنجعل مكوّناتنا قابلةً للتعريف في أدوات المطوّر. فخاصية `displayName` صديقتك، ويمكن أن نزدها فائدةً بواسطة TypeScript.

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

// This is the magic—Developer Tools will show "ProductCard" instead of just "Component"
ProductCard.displayName = 'ProductCard';
```

لكنّ ضبط `displayName` يدويًا على كل مكوّن يغدو مستهلكًا. لننشئ عونًا (helper) يستخدم TypeScript ليُتمّ الأمر آليًا:

```typescript
function createNamedComponent<T>(name: string, component: React.FC<T>): React.FC<T> {
  const namedComponent = component;
  namedComponent.displayName = name;
  return namedComponent;
}

// Usage
export const ProductCard = createNamedComponent('ProductCard', ({ product, onAddToCart }) => {
  // Component implementation...
});
```

> **نصيحة**
>
> هذا النمط ذو فائدة خاصة حين تصنع مكوّنات ديناميكيًا أو تستخدم المكوّنات عالية الرتبة (higher-order components) التي قد تحجب اسم المكوّن الأصلي.

## جعل الخصائص مقروءة في أدوات المطوّر

تستطيع أدوات المطوّر إظهار قيم الخصائص، لكنها غالبًا كائنات مبهمة بأسماء خصائص لا معنى لها. ويمكننا أن نستخدم TypeScript لصنع خصائص تُوثِّق نفسها.

بدلًا من هذا:

```typescript
// ❌ Unclear props in Developer Tools
interface ButtonProps {
  type: string; // What does "primary" mean?
  size: number; // What unit? Pixels? Rem?
  data: unknown; // What is this data?
}
```

افعل هذا:

```typescript
// ✅ Self-documenting props
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  'data-testid'?: string;
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, size, children, ...props }) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  );
};

// Developer Tools will show: variant="primary" size="large"
// Instead of: type="primary" size={16}
```

وبالبنى البياناتية (data structures) المعقّدة، فكّر في تشكيل تمثيلات صديقة للتصحيح:

```typescript
interface UserProfileProps {
  user: User;
}

// Add a debug representation to your types
interface User {
  id: string;
  email: string;
  profile: UserProfile;
  // Add this for Developer Tools visibility
  readonly _debugName?: string;
}

const createDebugUser = (user: User): User => ({
  ...user,
  _debugName: `${user.profile.firstName} ${user.profile.lastName} (${user.email})`,
});

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Developer Tools will show the debug name alongside the user object
  const debugUser = createDebugUser(user);

  return <div>{/* Profile implementation */}</div>;
};
```

## تسجيل الحالة بأمان الأنواع

حين تصحّح التغيّرات في الحالة، تبدو سجلات وحدة التحكم (console) غالبًا أكوامًا من كائناتٍ غامضة. لننشئ مُسجِّلات (loggers) آمنة الأنواع تفهم نماذج نطاقنا:

```typescript
import { z } from 'zod';

// Define your state schema
const CartStateSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      price: z.number(),
    }),
  ),
  total: z.number(),
  discounts: z.array(z.string()),
});

type CartState = z.infer<typeof CartStateSchema>;

// Type-safe logger that validates and formats state
function logStateChange<T>(
  componentName: string,
  action: string,
  oldState: T,
  newState: T,
  schema?: z.ZodType<T>,
) {
  if (process.env.NODE_ENV !== 'development') return;

  // Validate state if schema provided
  if (schema) {
    const oldResult = schema.safeParse(oldState);
    const newResult = schema.safeParse(newState);

    if (!oldResult.success || !newResult.success) {
      console.error(`🚨 Invalid state in ${componentName}:`, {
        oldStateErrors: oldResult.success ? null : oldResult.error,
        newStateErrors: newResult.success ? null : newResult.error,
      });
      return;
    }
  }

  console.group(`🔄 ${componentName}: ${action}`);
  console.log('Previous state:', oldState);
  console.log('New state:', newState);
  console.log(
    'Diff:',
    JSON.stringify(
      {
        added: findDifferences(oldState, newState),
        removed: findDifferences(newState, oldState),
      },
      null,
      2,
    ),
  );
  console.groupEnd();
}

// Usage in your components
const CartProvider: React.FC = ({ children }) => {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    total: 0,
    discounts: [],
  });

  const addItem = (item: CartItem) => {
    setCartState((prevState) => {
      const newState = {
        ...prevState,
        items: [...prevState.items, item],
        total: prevState.total + item.price * item.quantity,
      };

      logStateChange('CartProvider', 'ADD_ITEM', prevState, newState, CartStateSchema);

      return newState;
    });
  };

  // Rest of implementation...
};
```

## لوحات مخصّصة لأدوات المطوّر

في التطبيقات المعقّدة، قد لا تكفي أدوات المطوّر المدمجة في React. ويمكنك إنشاء لوحات مخصّصة لأدوات المطوّر تفهم نطاقك بعينه:

```typescript
interface DebugPanelProps {
  data: Record<string, unknown>;
  title: string;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ data, title }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '400px',
        maxHeight: '300px',
        overflow: 'auto',
      }}
    >
      <h4>{title}</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Use it in your components
const ComplexComponent: React.FC = () => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  return (
    <>
      <DebugPanel title="Component State" data={state} />
      {/* Your component JSX */}
    </>
  );
};
```

## حدود الأخطاء مع معلومات الأنواع

عند وقوع الأخطاء، قد يكون امتلاك سيّاقٍ عن الأنواع المعنيّة عديم الثمن. لننشئ حدّاً أخطاء (error boundary) يلتقاط معلومات النوع:

```typescript
interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  props?: Record<string, unknown>;
  state?: Record<string, unknown>;
}

interface TypedErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface TypedErrorBoundaryProps {
  children: React.ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

class TypedErrorBoundary extends React.Component<TypedErrorBoundaryProps, TypedErrorBoundaryState> {
  constructor(props: TypedErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<TypedErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const enhancedErrorInfo: ErrorInfo = {
      ...errorInfo,
      props: this.props,
      state: this.state,
    };

    this.setState({ errorInfo: enhancedErrorInfo });

    if (this.props.onError) {
      this.props.onError(error, enhancedErrorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error in ${this.props.componentName || 'Unknown Component'}`);
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.error('Props:', this.props);
      console.error('State:', this.state);
      console.groupEnd();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
          <h2>Something went wrong in {this.props.componentName}</h2>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.message}</pre>
            <pre>{this.state.error?.stack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
const App: React.FC = () => {
  return (
    <TypedErrorBoundary
      componentName="UserDashboard"
      onError={(error, errorInfo) => {
        // Send to error reporting service
        console.log('Reporting error:', error, errorInfo);
      }}
    >
      <UserDashboard />
    </TypedErrorBoundary>
  );
};
```

## توصيف الأداء بالأنواع

واجهة Profiler في React قوية، ويمكن أن نزدها فائدة بإضافة معلومات النوع:

```typescript
interface ProfilerData {
  componentName: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<unknown>;
}

function createTypedProfiler<T extends Record<string, unknown>>(
  componentName: string,
  onRender?: (data: ProfilerData & { props: T }) => void,
) {
  return function TypedProfiler({ children, ...props }: { children: React.ReactNode } & T) {
    return (
      <React.Profiler
        id={componentName}
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime,
          interactions,
        ) => {
          const profilerData: ProfilerData = {
            componentName: id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime,
            interactions,
          };

          if (process.env.NODE_ENV === 'development') {
            console.log(`⏱️ ${componentName} (${phase}):`, {
              ...profilerData,
              props,
            });
          }

          if (onRender) {
            onRender({ ...profilerData, props: props as T });
          }
        }}
      >
        {children}
      </React.Profiler>
    );
  };
}

// Usage
const ProductListProfiler = createTypedProfiler<{ products: Product[]; filters: FilterState }>(
  'ProductList',
  ({ actualDuration, props }) => {
    if (actualDuration > 16) {
      // Slower than 60fps
      console.warn(
        `ProductList is rendering slowly (${actualDuration}ms) with ${props.products.length} products`,
      );
    }
  },
);

const ProductList: React.FC<{ products: Product[]; filters: FilterState }> = ({
  products,
  filters,
}) => {
  return (
    <ProductListProfiler products={products} filters={filters}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductListProfiler>
  );
};
```

## تصحيح السياق (Context) بالأنواع

السياق (Context) في React قد يصعب تصحيحه لأنّ القيم تُمرَّر عبر طبقاتٍ متعددة غالبًا. لننشئ نظامًا لتصحيح السياق يُبقي على أمان الأنواع:

```typescript
import { createContext, useContext, useDebugValue } from 'react';

interface UserContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Create a debug-aware context
function createDebugContext<T>(
  name: string,
  defaultValue: T,
): [React.Context<T>, () => T, React.FC<{ value: T; children: React.ReactNode }>] {
  const Context = createContext<T>(defaultValue);
  Context.displayName = name;

  const useContextHook = () => {
    const value = useContext(Context);

    // Add debug information
    useDebugValue(value, (value) => {
      if (typeof value === 'object' && value !== null) {
        return `${name}: ${Object.keys(value).join(', ')}`;
      }
      return `${name}: ${String(value)}`;
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Using ${name} context:`, value);
    }

    return value;
  };

  const Provider: React.FC<{ value: T; children: React.ReactNode }> = ({ value, children }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  Provider.displayName = `${name}Provider`;

  return [Context, useContextHook, Provider];
}

// Usage
const [UserContext, useUser, UserProvider] = createDebugContext<UserContextValue>('User', {
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
});

// Now when you use useUser(), you'll get debug information in Developer Tools
const UserProfile: React.FC = () => {
  const { user, logout } = useUser(); // This will log context usage in development

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Log out</button>
    </div>
  );
};
```

## مثال من الواقع: نظام تصحيحٍ لمتجر إلكتروني

لنجمعها كلها في مثال واقعي. هكذا قد تنشئ نظامًا شاملًا للتصحيح في تطبيق تجارة إلكترونية:

```typescript
import { z } from 'zod';

// Define your domain schemas
const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  inStock: z.boolean(),
});

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  addedAt: z.date(),
});

const CartStateSchema = z.object({
  items: z.array(CartItemSchema),
  total: z.number(),
  appliedDiscounts: z.array(z.string()),
});

type Product = z.infer<typeof ProductSchema>;
type CartItem = z.infer<typeof CartItemSchema>;
type CartState = z.infer<typeof CartStateSchema>;

// Create a debug system that understands your domain
class ECommerceDebugger {
  private static instance: ECommerceDebugger;

  static getInstance(): ECommerceDebugger {
    if (!this.instance) {
      this.instance = new ECommerceDebugger();
    }
    return this.instance;
  }

  logProductInteraction(action: string, product: Product, metadata?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== 'development') return;

    const result = ProductSchema.safeParse(product);
    if (!result.success) {
      console.error('🚨 Invalid product data:', result.error);
      return;
    }

    console.group(`🛍️ Product ${action}: ${product.name}`);
    console.log('Product:', product);
    console.log('Metadata:', metadata);
    console.groupEnd();
  }

  logCartChange(action: string, oldState: CartState, newState: CartState) {
    if (process.env.NODE_ENV !== 'development') return;

    console.group(`🛒 Cart ${action}`);
    console.log('Previous items:', oldState.items.length);
    console.log('New items:', newState.items.length);
    console.log('Price change:', `$${oldState.total} → $${newState.total}`);

    if (oldState.items.length !== newState.items.length) {
      const added = newState.items.filter(
        newItem => !oldState.items.some(oldItem => oldItem.productId === newItem.productId)
      );
      const removed = oldState.items.filter(
        oldItem => !newState.items.some(newItem => newItem.productId === oldItem.productId)
      );

      if (added.length > 0) console.log('Added items:', added);
      if (removed.length > 0) console.log('Removed items:', removed);
    }

    console.groupEnd();
  }
}

// Use it in your components
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const debugger = ECommerceDebugger.getInstance();

  const handleAddToCart = () => {
    debugger.logProductInteraction('ADD_TO_CART', product, {
      timestamp: new Date(),
      source: 'ProductCard',
    });

    // Add to cart logic...
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart} disabled={!product.inStock}>
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

// Set display name for Developer Tools
ProductCard.displayName = 'ProductCard';
```

## الخلاصة

لا يلزم أن يكوّن TypeScript وأدوات المطوّر في React عالَمَين منفصلَين. وباستخدامك الأنواع لتحسين تجربة التصحيح، تصنع بيئة تطوير فيها:

- تحمل المكوّنات أسماء ذات معنى تصمد أمام التصغير (minification)
- الخصائص والحالة تُوثِّق نفسها
- رسائل الخطأ تتضمّن معلومات النوع ذات الصلة
- تُرصد اختناقات الأداء وتُميَّز بالسياق تلقائيًا
- تُتحقَّق التغيّرات في الحالة وتُسجَّل في فروق واضحة

المفتاح أن تفكّر في أنواعك ليس كمُعِينات وقت التصريف فقط، بل كشركاء تصحيح وقت التشغيل. وحين تغوص في جلسة تصحيح في الثانية فجرًا (كلّنا مرّا بذلك)، فإن امتلاك أدوات مطوّر تفهم نماذج نطاقك كما تفهمها أنت قد يكون الفرق بين إيجاد العيب سريعًا وقضاء ساعات في حكّ رأسك.

> **تحذير**
>
> تذكّر أن تُغلّف شيفرة التصحيح بفحص `process.env.NODE_ENV === 'development'` لتجنّب شحن عبء التصحيح إلى الإنتاج.

ابدأ صغيرًا—أضف أسماء عرض إلى قليلٍ من المكوّنات، أنشئ مُسجِّل حالة بسيطًا، أو ابنِ حدود أخطاء مخصّصة. وسيُدهشك مقدار ما تتراكم به هذه التحسينات الصغيرة لتجربة تصحيح أفضل كثيرًا.

وسيشكرك أنت في المستقبل (وإلى أعضاء فريقك) حين تُصبح تلك الأخطاء الغامضة في الإنتاج أسهل كثيرًا في التتبّع.
