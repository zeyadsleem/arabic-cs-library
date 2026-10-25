---
title: "أنواع المكوّنات ذات الرتبة العليا"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/higher-order-components-typing"
---

كانت المكوّنات ذات الرتبة العليا (Higher-Order Components) هي الحلّ الذي قدّمه React في الأصل لإعادة استخدام المكوّنات قبل ظهور الخُطّافات. ورغم أنّ الخُطّافات حلّت محلّها في معظم حالات الاستخدام، فإنّك ما زالت ستصادفها في العالم الحقيقي — وخصوصًا في قواعد الشيفرة القديمة أو عند التكامل مع مكتبات لم تنتقل بعد إلى الخُطّافات. والتحدّي هو: كيف تجعل TypeScript يفهم ما يفعله المكوّن ذو الرتبة العليا من دون أن تفقد صوابك (أو أنواع خصائص مكوّنك) في أثناء ذلك.

وهنا جوهر الأمر: المكوّنات ذات الرتبة العليا ليست سوى دوالّ تأخذ مكوّنًا وتُعيد مكوّنًا جديدًا بسلوك إضافي. والجزء الصعب هو التأكّد من أن TypeScript يفهم أي الخصائص يتلقّاها المكوّن الملفوف، وأي الخصائص يحقنها المكوّن ذو الرتبة العليا، وكيف تُمرَّر المراجع (refs) على نحو صحيح. فلنمرّ خطوةً بخطوة على بناء مكوّنات ذات رتبة عليا مُحكمة الأنواع تحافظ على واجهة المكوّن الأصلي وتضيف تحسيناتنا.

## النمط الأساسي للمكوّن ذي الرتبة العليا

قبل أن نغوص في تعقيدات الأنواع، لنثبّت أولًا ما نتعامل معه. يتبع المكوّن ذو الرتبة العليا الأساسي هذا النمط:

```typescript
// ❌ Untyped version (don't do this)
const withLoading = (WrappedComponent) => {
  return (props) => {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
};
```

وهذا يعمل وقت التشغيل، لكن TypeScript لا يعرف شيئًا عمّا يجري. لنُصلح ذلك خطوةً بخطوة.

## تحديد أنواع أول مكوّن ذي رتبة عليا

الفكرة المفتاحية في تحديد أنواع المكوّنات ذات الرتبة العليا هي فهم أنّك تعمل مع **الأنواع العامة** (generics) — ينبغي أن يعمل مكوّنك ذي الرتبة العليا مع أي نوع من المكوّنات مع الحفاظ على خصائص ذلك المكوّن تحديدًا. وهذا أول مكوّن ذي رتبة عليا مُحكم الأنواع عندنا:

```typescript
import { ComponentType } from 'react';

// Define props that our HOC injects
interface WithLoadingProps {
  isLoading?: boolean;
}

// Generic HOC that works with any component
function withLoading<T extends {}>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & WithLoadingProps> {
  return function WithLoadingComponent(props: T & WithLoadingProps) {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    // TypeScript knows restProps has type T
    return <WrappedComponent {...(restProps as T)} />;
  };
}
```

لنُفكّك هذا:

- **`T extends {}`**: قيد النوع العام لدينا يضمن أنّ `T` كائن (خصائص المكوّن)
- **`ComponentType<T>`**: نوع TypeScript لمكوّنات React التي تقبل خصائص من النوع `T`
- **`T & WithLoadingProps`**: يتلقّى المكوّن الملفوف خصائصه الأصلية إضافةً إلى الخصائص التي نحقنها
- **تأكيد النوع `as T`**: بعد التفكيك، نؤكّد أنّ الخصائص المتبقّية تطابق توقّعات المكوّن الأصلي

## مثال من العالم الحقيقي: مكوّن ذا رتبة عليا للمصادقة

إليك مثالًا أكثر عملية — مكوّنًا ذا رتبة عليا يتولّى منطق المصادقة:

```typescript
import { ComponentType, useContext } from 'react';
import { AuthContext } from './AuthContext';

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

// Props our HOC injects into wrapped components
interface WithAuthProps {
  user: AuthUser;
  logout: () => void;
}

// Props our HOC expects from consumers
interface AuthRequiredProps {
  fallback?: ComponentType;
}

function withAuth<T extends {}>(
  WrappedComponent: ComponentType<T & WithAuthProps>
): ComponentType<T & AuthRequiredProps> {
  return function WithAuthComponent(props: T & AuthRequiredProps) {
    const { fallback: Fallback = DefaultLoginForm, ...restProps } = props;
    const { user, logout, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated || !user) {
      return <Fallback />;
    }

    // Inject auth props into the wrapped component
    return (
      <WrappedComponent
        {...(restProps as T)}
        user={user}
        logout={logout}
      />
    );
  };
}

const DefaultLoginForm = () => <div>Please log in</div>;

// Usage with full type safety
interface DashboardProps {
  title: string;
}

const Dashboard = ({ title, user, logout }: DashboardProps & WithAuthProps) => (
  <div>
    <h1>{title}</h1>
    <p>Welcome, {user.name}!</p>
    <button onClick={logout}>Sign Out</button>
  </div>
);

const AuthenticatedDashboard = withAuth(Dashboard);

// TypeScript knows this component expects title and optional fallback
<AuthenticatedDashboard title="My Dashboard" />
```

لاحظ كيف يتلقّى المكوّن `Dashboard` الملفوف خاصية `title` الأصلية إضافةً إلى خصائص المصادقة المحقونة (`user` و`logout`)، بينما لا يحتاج مستهلكو `AuthenticatedDashboard` إلّا إلى تقديم الخصائص الأصلية مع أي خصائص خاصة بالمكوّن ذي الرتبة العليا.

## التعامل مع الخصائص التي تريد استبعادها

أحيانًا يستهلك مكوّنك ذي الرتبة العليا بعض الخصائص ولا ينبغي أن يمرّرها إلى الأسفل. استخدم نوع `Omit` من أدوات TypeScript:

```typescript
interface WithTimestampProps {
  timestamp?: number;
  showTimestamp?: boolean;
}

function withTimestamp<T extends {}>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & WithTimestampProps> {
  return function WithTimestampComponent(props: T & WithTimestampProps) {
    const { timestamp = Date.now(), showTimestamp = true, ...restProps } = props;

    return (
      <div>
        {showTimestamp && (
          <small>Last updated: {new Date(timestamp).toLocaleString()}</small>
        )}
        <WrappedComponent {...(restProps as T)} />
      </div>
    );
  };
}

// Or if you want to be more explicit about which props are consumed:
function withTimestampExplicit<T extends {}>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & WithTimestampProps> {
  return function WithTimestampComponent(
    props: T & WithTimestampProps
  ) {
    const { timestamp, showTimestamp, ...restProps } = props;

    // Explicitly omit the HOC props from what gets passed down
    return (
      <div>
        {/* render timestamp logic */}
        <WrappedComponent {...(restProps as Omit<T & WithTimestampProps, keyof WithTimestampProps>)} />
      </div>
    );
  };
}
```

> **تلميح**
>
> عندما يستهلك مكوّنك ذي الرتبة العليا خصائص لا ينبغي أن تصل إلى المكوّن الملفوف، فإنّ نهج التفكيك يكون عادةً أنظف من أنواع `Omit` المعقّدة.

## تمرير المراجع (refs) باحتراف

هنا تصبح الأمور أكثر تعقيدًا. إذا كان المكوّن الملفوف يستخدم `forwardRef`، فيحتاج مكوّنك ذي الرتبة العليا إلى الحفاظ على هذا السلوك:

```typescript
import { ComponentType, forwardRef, ForwardedRef } from 'react';

// HOC that preserves ref forwarding
function withErrorBoundary<T extends {}, R = any>(
  WrappedComponent: ComponentType<T & { ref?: ForwardedRef<R> }>
) {
  return forwardRef<R, T>((props: T, ref) => {
    // In a real implementation, you'd have error boundary logic here
    return <WrappedComponent {...props} ref={ref} />;
  });
}

// Usage with ref forwarding preserved
const MyInput = forwardRef<HTMLInputElement, { placeholder: string }>((props, ref) => (
  <input ref={ref} {...props} />
));

const SafeInput = withErrorBoundary(MyInput);

// This works! TypeScript knows SafeInput can receive a ref
const inputRef = useRef<HTMLInputElement>(null);
<SafeInput ref={inputRef} placeholder="Type here..." />
```

الفكرة المفتاحية هي استخدام `forwardRef` داخل مكوّنك ذي الرتبة العليا والتأكّد من محاذاة الأنواع العامة بشكل صحيح.

## `withErrorBoundary<P>` مقابل `useErrorBoundary()`

غلّف أي مكوّن بمكوّن حدّ أخطاء (error boundary) ذي رتبة عليا مُحكم الأنواع، وقارن تجربة المطوّر (DX) مع النهج القائم على الخُطّاف.

```typescript
import React, { Component, ComponentType, ErrorInfo, ReactNode } from 'react';

type ErrorFallbackProps<E extends Error = Error> = {
  error: E;
  reset?: () => void;
};

type WithErrorBoundaryOptions<E extends Error = Error> = {
  Fallback?: ComponentType<ErrorFallbackProps<E>>;
  onError?: (error: E, info: ErrorInfo) => void;
};

export function withErrorBoundary<P, E extends Error = Error>(
  Wrapped: ComponentType<P>,
  options: WithErrorBoundaryOptions<E> = {},
) {
  const { Fallback, onError } = options;

  return class ErrorBoundary extends Component<P, { error?: E }> {
    static displayName = `withErrorBoundary(${Wrapped.displayName || Wrapped.name || 'Component'})`;

    static getDerivedStateFromError(error: E) {
      return { error };
    }

    componentDidCatch(error: E, info: ErrorInfo) {
      onError?.(error, info);
    }

    reset = () => this.setState({ error: undefined });

    render(): ReactNode {
      if (this.state?.error) {
        return Fallback ? <Fallback error={this.state.error} reset={this.reset} /> : null;
      }
      return <Wrapped {...(this.props as P)} />;
    }
  };
}

// Hook alternative: more composable ergonomics in function components
export function useErrorBoundary<E extends Error = Error>() {
  const [error, setError] = React.useState<E | null>(null);
  const reset = React.useCallback(() => setError(null), []);
  const capture = React.useCallback((e: E) => setError(e), []);
  return { error, capture, reset } as const;
}

// Usage comparison
const Fallback = ({ error, reset }: ErrorFallbackProps) => (
  <div role="alert">
    <pre>{error.message}</pre>
    <button onClick={reset}>Try again</button>
  </div>
);

// HOC
const SafeProfile = withErrorBoundary(Profile, { Fallback });

// Hook
function ProfileWithHook(props: ProfileProps) {
  const { error, capture, reset } = useErrorBoundary();
  if (error) return <Fallback error={error} reset={reset} />;
  return <Profile {...props} onError={capture} />;
}
```

المكوّن ذو الرتبة العليا يعمل جيدًا مع المكوّنات الصنفية أو مكوّنات الأطراف الثالثة؛ أمّا الخُطّاف فأكثر راحةً في المكوّنات الدالية الجديدة ويُبقي معالجة الأخطاء أقرب إلى موضع الفشل.

## النمط المتقدّم: الخصائص الشرطية

أحيانًا تريد لمكوّنك ذي الرتبة العليا أن يشترط بعض الخصائص بشكل شرطي بحسب الإعدادات:

```typescript
interface BaseLoadingProps {
  isLoading?: boolean;
}

interface CustomLoadingProps extends BaseLoadingProps {
  loadingComponent: ComponentType;
}

// Overloaded function signatures for different use cases
function withConditionalLoading<T extends {}>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & BaseLoadingProps>;

function withConditionalLoading<T extends {}>(
  WrappedComponent: ComponentType<T>,
  useCustomLoading: true
): ComponentType<T & CustomLoadingProps>;

function withConditionalLoading<T extends {}>(
  WrappedComponent: ComponentType<T>,
  useCustomLoading?: boolean
) {
  return function WithConditionalLoadingComponent(
    props: T & (typeof useCustomLoading extends true ? CustomLoadingProps : BaseLoadingProps)
  ) {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      if (useCustomLoading) {
        const { loadingComponent: LoadingComponent } = props as CustomLoadingProps;
        return <LoadingComponent />;
      }
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(restProps as T)} />;
  };
}

// Usage - TypeScript enforces the right props based on the overload
const BasicWrapped = withConditionalLoading(MyComponent);
// Only needs isLoading prop

const CustomWrapped = withConditionalLoading(MyComponent, true);
// Requires both isLoading AND loadingComponent props
```

## المآخذ الشائعة وكيف تتجنّبها

### مخرج `any` 👎

```typescript
// ❌ Tempting but defeats the purpose
function badHOC(WrappedComponent: any): any {
  return (props: any) => <WrappedComponent {...props} />;
}

// ✅ Properly typed version
function goodHOC<T extends {}>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> {
  return function HOCComponent(props: T) {
    return <WrappedComponent {...props} />;
  };
}
```

### قيود الأنواع العامة المفقودة

```typescript
// ❌ Too permissive - T could be anything
function problematicHOC<T>(component: ComponentType<T>) {
  // TypeScript can't guarantee T has object properties
}

// ✅ Constrain T to be an object
function betterHOC<T extends {}>(component: ComponentType<T>) {
  // Now TypeScript knows T is an object type
}
```

### النشر الخاطئ للخصائص

```typescript
// ❌ Loses type safety
function unsafeHOC<T>(WrappedComponent: ComponentType<T>) {
  return (props: any) => <WrappedComponent {...props} />;
}

// ✅ Maintains type safety through proper generics
function safeHOC<T extends {}>(WrappedComponent: ComponentType<T>) {
  return function SafeComponent(props: T) {
    return <WrappedComponent {...props} />;
  };
}
```

## متى تستخدم المكوّنات ذات الرتبة العليا مقابل الخُطّافات

> **ملاحظة**
>
> يقدّم React الحديث أولوية كبرى للخُطّافات على المكوّنات ذات الرتبة العليا في معظم حالات الاستخدام. فكّر في المكوّنات ذات الرتبة العليا عندما:
>
> - تحتاج إلى تغليف مكوّنات من الأطراف الثالثة لا تدعم الخُطّافات
> - تعمل مع مكوّنات صنفية لا يمكنها استخدام الخُطّافات
> - تحتاج إلى تصيير مكوّنات مختلفة تمامًا بشكل شرطي
> - تبني مكتبة يجب أن تعمل مع أي نوع من المكوّنات

في الشيفرة الجديدة، فضّل الخُطّافات المخصّصة:

```typescript
// ✅ Modern approach with hooks
function useAuth() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  return { user, logout, isAuthenticated };
}

// Much simpler component
function Dashboard({ title }: { title: string }) {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginForm />;

  return (
    <div>
      <h1>{title}</h1>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

## الخلاصة

يتطلّب تحديد أنواع المكوّنات ذات الرتبة العليا على نحو صحيح فهم الأنواع العامة وأنواع المكوّنات والتعامل مع الخصائص في TypeScript. وستغطّي الأنماط التي راجعناها معظم حالات الاستخدام من العالم الحقيقي™:

- استخدم الأنواع العامة مع قيد كائن (`T extends {}`)
- استفدِ من `ComponentType<T>` في تحديد أنواع المكوّنات
- استخدم أنواع التقاطع (`T & InjectedProps`) في دمج الخصائص
- لا تنسَ `forwardRef` للمكوّنات التي تمرّر المراجع
- فضّل الخُطّافات على المكوّنات ذات الرتبة العليا في الشيفرة الجديدة

تذكّر أنّ الهدف هو جعل مكوّناتك ذات الرتبة العليا آمنة الأنواع من دون التضحية بالمرونة التي جعلتها مفيدة في المقام الأول. وحين تصحّ الأنواع، تصير مكوّناتك ذات الرتبة العليا أدوات قوية قابلة لإعادة الاستخدام تتكامل بسلاسة مع بقية قاعدة شيفرة React + TypeScript لديك.

في المرة القادمة التي تصادف فيها مكوّنًا ذا رتبة عليا (أو تحتاج إلى بناء واحد)، ستكون قد تسلّحت بمعرفة TypeScript التي تتيح لك تغليفه على نحو صحيح — من دون دموع.
