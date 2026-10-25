---
title: "حدود الأخطاء وحدود Suspense"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/error-boundaries-and-suspense-boundaries"
---

حدود الأخطاء وحدود Suspense هما أدوات React للتعامل بلياقة مع ما لا يتوقّع — الانهيارات وحالات التحميل على التوالي. لكنّ هذا هو بيت القصيد: إنّهما مكوّنات صنفية وواجهات برمجية خاصّة لا تحظى بنفس اهتمام TypeScript الذي تحظى به خُطّافاتك ومكوّناتك الدالية المعتادة. لنُصلح ذلك بتعلّم كيفية تحديد أنواع هذه الحدود على نحو صحيح، حتى تصير بدائل العرض (fallbacks) ومعالجة الأخطاء لديك متينة كسائر تطبيقك.

كلتا الحدّين تعملان كشبكات أمان في شجرة المكوّنات لديك. فحدود الأخطاء تلتقط أخطاء JavaScript أثناء التصيير وفي توابع دورة الحياة وفي البانِي، بينما تتعامل حدود Suspense مع العمليات غير المتزامنة عبر التقاط الوعود المرمية وعرض حالات التحميل. ويضمن ضبط الأنواع أن تكون معلومات الخطأ لديك منظّمة على نحو صحيح وأن يتلقّى مكوّنات البديل الخصائص التي تتوقّعها بالضبط.

## حدود الأخطاء: التقاط ما يحدث خطأً

حدود الأخطاء هي مكوّنات صنفية تُنفّذ إمّا `componentDidCatch` أو الأسلوب الساكن `getDerivedStateFromError`. وبما أنّنا نعمل مع TypeScript، فنحتاج إلى تحديد نوعَي حالة المكوّن ومعلومات الخطأ التي نتلقّاها على نحو صحيح.

### التنفيذ الأساسي لحدّ الأخطاء

لنبدأ بحدّ أخطاء مُحكم الأنواع يلتقط الخطأ ومعلومات الخطأ الإضافية:

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to trigger fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error information
    this.setState({ errorInfo });

    // Call optional error reporting callback
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback or default error message
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.state.errorInfo!)
      ) : (
        <div>Something went wrong.</div>
      );
    }

    return this.props.children;
  }
}
```

لاحظ كيف نُحدّد نوع كائن `ErrorInfo` القادم من React على نحو صحيح، وهو يحتوي على معلومات تنقيب قيّمة مثل أثر مكدّس المكوّنات. أمّا خاصية fallback فهي دالة تتلقّى الخطأ ومعلومات الخطأ معًا، فتمنحك تحكّمًا كاملًا في كيفية عرض تفاصيل الخطأ.

### مكوّنات بديل مُنمَّطة

ينبغي أن تكون مكوّنات البديل لديك مُحكمة الأنواع لتتلقّى معلومات الخطأ التي تحتاج إليها:

```typescript
interface ErrorFallbackProps {
  error: Error;
  errorInfo?: ErrorInfo;
  resetErrorBoundary?: () => void;
}

function ErrorFallback({ error, errorInfo, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="error-boundary">
      <h2>Oops! Something went wrong</h2>
      <p>{error.message}</p>

      {process.env.NODE_ENV === 'development' && errorInfo && (
        <details>
          <summary>Error Details (Dev Only)</summary>
          <pre>{errorInfo.componentStack}</pre>
        </details>
      )}

      {resetErrorBoundary && <button onClick={resetErrorBoundary}>Try Again</button>}
    </div>
  );
}
```

### حدّ أخطاء محسَّن مع إمكانية إعادة التعيين

غالبًا ما تحتاج حدود الأخطاء في العالم الحقيقي إلى القدرة على إعادة تعيين حالتها. وإليك كيفية تنفيذ ذلك بدعم TypeScript على نحو صحيح:

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  resetErrorBoundary = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: retryCount + 1,
      });
    }
  };

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { maxRetries = 3, fallback: FallbackComponent } = this.props;

    if (hasError && error) {
      return (
        <FallbackComponent
          error={error}
          errorInfo={errorInfo}
          resetErrorBoundary={retryCount < maxRetries ? this.resetErrorBoundary : undefined}
          retryCount={retryCount}
          maxRetries={maxRetries}
        />
      );
    }

    return this.props.children;
  }
}
```

> **تلميح**
>
> استخدم الأنواع العامة حين تحتاج حدود أخطائك إلى التعامل مع أنواع أخطاء محدّدة. فمثلًا `ErrorBoundary<ApiError>` يمكن أن يوفّر وصولًا مُنمَّطًا إلى خصائص الأخطاء الخاصة بواجهة البرمجة.

## حدود `Suspense`: التعامل بأناقة مع اللاتزامنية

حدود Suspense أسهل بكثير في تحديد الأنواع لأنّها مكوّنات مدمجة في React، لكنّ خاصية fallback ومعالجة الأخطاء ما زالت تحتاج إلى تحديد دقيق:

```typescript
import { Suspense, ReactNode } from 'react';

interface LoadingFallbackProps {
  message?: string;
  progress?: number;
}

function LoadingFallback({ message = 'Loading...', progress }: LoadingFallbackProps) {
  return (
    <div className="loading-boundary">
      <div className="spinner" />
      <p>{message}</p>
      {progress !== undefined && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

interface AsyncWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingMessage?: string;
}

function AsyncWrapper({ children, fallback, loadingMessage }: AsyncWrapperProps) {
  return (
    <Suspense fallback={fallback || <LoadingFallback message={loadingMessage} />}>
      {children}
    </Suspense>
  );
}
```

### الجمع بين حدود الخطأ وحدود `Suspense`

في الممارسة العملية، ستحتاج غالبًا إلى التعامل مع الأخطاء والتعليق معًا. وإليك غلافًا مُنمَّطًا يتعامل مع القيدين:

```typescript
interface BoundaryWrapperProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

function BoundaryWrapper({
  children,
  loadingFallback = <LoadingFallback />,
  errorFallback = ErrorFallback,
  onError,
}: BoundaryWrapperProps) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

// Usage with proper type safety
<BoundaryWrapper
  loadingFallback={<LoadingFallback message="Loading user data..." />}
  errorFallback={UserErrorFallback}
  onError={(error, errorInfo) => {
    // TypeScript knows exactly what error and errorInfo contain
    analytics.track('error_boundary_triggered', {
      error: error.message,
      stack: errorInfo.componentStack,
    });
  }}
>
  <UserProfile userId={userId} />
</BoundaryWrapper>;
```

## أنماط من العالم الحقيقي

### حدود على مستوى المسارات

عند بناء تطبيقات تستخدم التوجيه (routing)، ستحتاج إلى حدود على مستوى المسار لمنع أخطاء التنقل من إسقاط التطبيق بأكمله:

```typescript
interface RouteErrorBoundaryProps {
  children: ReactNode;
  routeName: string;
}

function RouteErrorBoundary({ children, routeName }: RouteErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={(error, errorInfo) => (
        <RouteFallback error={error} errorInfo={errorInfo} routeName={routeName} />
      )}
      onError={(error, errorInfo) => {
        logError(`Route ${routeName} error:`, error, errorInfo);
      }}
    >
      <Suspense fallback={<RouteLoadingSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

interface RouteFallbackProps extends ErrorFallbackProps {
  routeName: string;
}

function RouteFallback({ error, routeName }: RouteFallbackProps) {
  return (
    <div className="route-error">
      <h1>Page Unavailable</h1>
      <p>The {routeName} page encountered an error:</p>
      <code>{error.message}</code>
      <button onClick={() => window.location.reload()}>Refresh Page</button>
    </div>
  );
}
```

### حدود أخطاء واعية بالسياق

أحيانًا تحتاج إلى حدود أخطاء تفهم سياقها وتستطيع تقديم معالجة أدقّ للأخطاء:

```typescript
interface ContextualErrorBoundaryProps {
  children: ReactNode;
  context: string;
  criticalErrors?: string[]; // Error types that should bubble up
}

class ContextualErrorBoundary extends Component<ContextualErrorBoundaryProps, ErrorBoundaryState> {
  // ... basic error boundary implementation

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { criticalErrors = [], context } = this.props;

    // If this is a critical error type, re-throw to bubble up
    if (criticalErrors.some((criticalError) => error.message.includes(criticalError))) {
      throw error;
    }

    // Otherwise, handle locally
    this.setState({ errorInfo });

    logError(`${context} boundary caught error:`, error, errorInfo);
  }

  // ... rest of implementation
}

// Usage
<ContextualErrorBoundary
  context="UserDashboard"
  criticalErrors={['AuthenticationError', 'NetworkError']}
>
  <UserDashboard />
</ContextualErrorBoundary>;
```

## أنواع معلومات الخطأ

توفّر واجهة `ErrorInfo` في TypeScript معلومات منظّمة عن مكان وقوع الأخطاء. وإليك كيفية الاستفادة منها على نحو صحيح:

```typescript
import { ErrorInfo } from 'react';

// ErrorInfo contains:
// - componentStack: string (component hierarchy where error occurred)
// - errorBoundary?: Component (the boundary that caught the error)
// - errorBoundaryStack?: string (stack trace of the boundary)

const logDetailedError = (error: Error, errorInfo: ErrorInfo) => {
  const errorReport = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // Send to your error reporting service
  errorReportingService.report(errorReport);
};
```

## المآخذ الشائعة والحلول

### لا تلتقط كل شيء

حدود الأخطاء تلتقط فقط الأخطاء الموجودة في شجرة المكوّنات التي تقع تحتها. فهي لا تلتقط:

- الأخطاء في معالجات الأحداث
- الأخطاء في الشيفرة غير المتزامنة
- الأخطاء أثناء التصيير على الخادم
- الأخطاء داخل حدّ الأخطاء نفسه

```typescript
// ❌ This won't be caught by error boundaries
const BadComponent = () => {
  const handleClick = () => {
    throw new Error('Event handler error');
  };

  return <button onClick={handleClick}>Click me</button>;
};

// ✅ Wrap async operations properly
const GoodAsyncComponent = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleAsyncOperation = async () => {
    try {
      await riskyAsyncOperation();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Unknown error'));
    }
  };

  if (error) throw error; // Now the error boundary can catch it

  return <button onClick={handleAsyncOperation}>Safe Async</button>;
};
```

### الإبلاغ عن الأخطاء بأمان الأنواع

عند التكامل مع خدمات الإبلاغ عن الأخطاء، تأكّد من تحديد أنواع بيانات الخطأ لديك على نحو صحيح:

```typescript
interface ErrorReport {
  error: {
    message: string;
    stack?: string;
    name: string;
  };
  errorInfo: {
    componentStack: string;
  };
  metadata: {
    userId?: string;
    route: string;
    timestamp: string;
  };
}

const reportError = (
  error: Error,
  errorInfo: ErrorInfo,
  metadata: Omit<ErrorReport['metadata'], 'timestamp'>,
): void => {
  const report: ErrorReport = {
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    errorInfo: {
      componentStack: errorInfo.componentStack,
    },
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };

  errorReportingService.send(report);
};
```

## الخطوات التالية

حدود الأخطاء وحدود Suspense ضرورية لبناء تطبيقات React مرنة. ومع التكامل السليم مع TypeScript، يمكنك ضمان أنّ معالجتك للأخطاء متينة بقدر منطق تطبيقك الرئيسي. والمفتاح هو:

1. **حدّد أنواع معلومات الخطأ** على نحو شامل ليسهل التنقيح
2. **أنشئ مكوّنات حدود قابلة لإعادة الاستخدام** يمكن تركيبها في أنحاء تطبيقك
3. **تعامل مع سياقات الخطأ المختلفة** على نحو ملائم بدلًا من الاعتماد على مقاسٍ واحد يناسب الجميع
4. **تكامل مع خدمات المراقبة** لتتبّع الأخطاء في بيئة الإنتاج

تصير حدود أخطائك توثيقًا لكيفية تعامل تطبيقك مع الإخفاق، ويجعل تحديد الأنواع على نحو صحيح هذا التوثيق قابلًا للتنفيذ والتحقّق. وهذه أساس متين جدًا لإطلاق برمجيات موثوقة.
