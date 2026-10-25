---
title: "أنماط متقدّمة للتعامل مع الأخطاء"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/advanced-error-handling-patterns"
---

التعامل مع الأخطاء هو المجال الذي تنهار فيه تطبيقات كثيرة بُنيت بـ React. يرى المستخدمون رسائل عامّة من نوع «حدث خطأ ما»، ويضيع المطوّرون معلومات أساسية عن التشخيص، ويصبح التعافي من الخطأ مستحيلًا. لكن مع TypeScript والأنماط السليمة، يمكننا بناء تطبيقات مرنة تتعامل مع الأخطاء بلياقة، وتقدّم تغذية راجعة ذات معنًى، وتتعافى تلقائيًا كلما أمكن ذلك.

## فلسفة التعامل مع الأخطاء

التعامل الجيّد مع الأخطاء يقوم على ثلاثة أمور:

1. **الوقاية** - التقاط الأخطاء قبل أن تقع
2. **التعافي** - التعامل مع الأخطاء بلياقة عندما تقع
3. **الإبلاغ** - تزويد المستخدمين والمطوّرين بمعلومات قابلة للتنفيذ

```typescript
// ❌ Poor error handling
try {
  const user = await api.getUser(id);
  setUser(user);
} catch (error) {
  console.error(error);
  setError('Something went wrong');
}

// ✅ Good error handling
try {
  const user = await api.getUser(id);
  setUser(user);
} catch (error) {
  const errorInfo = categorizeError(error);
  logError(errorInfo, { userId: id, action: 'getUser' });

  if (errorInfo.isRetryable) {
    scheduleRetry(() => api.getUser(id));
  }

  setError(errorInfo.userMessage);
}
```

## نظام أخطاء مُحكَم الأنواع

ابدأ بنظام أنواع أخطاء شامل:

```typescript
// types/errors.ts
export interface BaseError {
  readonly code: string;
  readonly message: string;
  readonly timestamp: Date;
  readonly correlationId: string;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface NetworkError extends BaseError {
  readonly type: 'network';
  readonly status?: number;
  readonly url: string;
  readonly isTimeout: boolean;
  readonly isRetryable: boolean;
}

export interface ValidationError extends BaseError {
  readonly type: 'validation';
  readonly field: string;
  readonly value: any;
  readonly rule: string;
}

export interface BusinessError extends BaseError {
  readonly type: 'business';
  readonly domain: string;
  readonly action: string;
}

export interface SystemError extends BaseError {
  readonly type: 'system';
  readonly component: string;
  readonly isRecoverable: boolean;
}

export type AppError = NetworkError | ValidationError | BusinessError | SystemError;

// Error factory functions
export class ErrorFactory {
  static network(status: number, url: string, message: string, isTimeout = false): NetworkError {
    return {
      type: 'network',
      code: `NET_${status}`,
      message,
      status,
      url,
      isTimeout,
      isRetryable: this.isRetryableStatus(status),
      timestamp: new Date(),
      correlationId: generateId(),
      severity: status >= 500 ? 'high' : 'medium',
    };
  }

  static validation(field: string, value: any, rule: string, message: string): ValidationError {
    return {
      type: 'validation',
      code: `VAL_${rule.toUpperCase()}`,
      message,
      field,
      value,
      rule,
      timestamp: new Date(),
      correlationId: generateId(),
      severity: 'low',
    };
  }

  static business(domain: string, action: string, message: string, code?: string): BusinessError {
    return {
      type: 'business',
      code: code || `BIZ_${domain.toUpperCase()}_${action.toUpperCase()}`,
      message,
      domain,
      action,
      timestamp: new Date(),
      correlationId: generateId(),
      severity: 'medium',
    };
  }

  private static isRetryableStatus(status: number): boolean {
    return status >= 500 || status === 408 || status === 429;
  }
}
```

## نمط Result في التعامل مع الأخطاء

نفّذ نمط `Result` من أجل تعامل صريح مع الأخطاء:

```typescript
// utils/result.ts
export type Result<T, E = AppError> = { success: true; data: T } | { success: false; error: E };

export class Ok<T> {
  constructor(public readonly data: T) {}

  static of<T>(data: T): Result<T, never> {
    return { success: true, data };
  }
}

export class Err<E> {
  constructor(public readonly error: E) {}

  static of<E>(error: E): Result<never, E> {
    return { success: false, error };
  }
}

// Utility functions for Result handling
export const Result = {
  ok: <T>(data: T): Result<T, never> => ({ success: true, data }),

  err: <E>(error: E): Result<never, E> => ({ success: false, error }),

  from: <T>(promise: Promise<T>): Promise<Result<T, AppError>> => {
    return promise.then((data) => Result.ok(data)).catch((error) => Result.err(error));
  },

  map: <T, U, E>(result: Result<T, E>, fn: (data: T) => U): Result<U, E> => {
    return result.success ? Result.ok(fn(result.data)) : result;
  },

  mapError: <T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> => {
    return result.success ? result : Result.err(fn(result.error));
  },

  flatMap: <T, U, E>(result: Result<T, E>, fn: (data: T) => Result<U, E>): Result<U, E> => {
    return result.success ? fn(result.data) : result;
  },

  match: <T, E, U>(
    result: Result<T, E>,
    onSuccess: (data: T) => U,
    onError: (error: E) => U,
  ): U => {
    return result.success ? onSuccess(result.data) : onError(result.error);
  },
};
```

## عميل API واعي بالأخطاء

ابنِ عميل API يتعامل مع الأخطاء بمنهجية:

```typescript
// api/client.ts
interface RequestConfig {
  retries?: number;
  timeout?: number;
  retryDelay?: number;
  retryBackoff?: number;
  signal?: AbortSignal;
}

class ApiClient {
  private baseUrl: string;
  private defaultConfig: RequestConfig;

  constructor(baseUrl: string, config: RequestConfig = {}) {
    this.baseUrl = baseUrl;
    this.defaultConfig = {
      retries: 3,
      timeout: 10000,
      retryDelay: 1000,
      retryBackoff: 2,
      ...config,
    };
  }

  async request<T>(
    endpoint: string,
    options: RequestInit & RequestConfig = {},
  ): Promise<Result<T, NetworkError>> {
    const config = { ...this.defaultConfig, ...options };
    const url = `${this.baseUrl}${endpoint}`;

    return this.executeWithRetry(async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      try {
        const response = await fetch(url, {
          ...options,
          signal: config.signal || controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          return Result.err(
            ErrorFactory.network(response.status, url, await this.extractErrorMessage(response)),
          );
        }

        const data = await response.json();
        return Result.ok(data);
      } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof DOMException && error.name === 'AbortError') {
          return Result.err(ErrorFactory.network(408, url, 'Request timeout', true));
        }

        if (error instanceof TypeError && error.message.includes('fetch')) {
          return Result.err(ErrorFactory.network(0, url, 'Network error - check your connection'));
        }

        return Result.err(
          ErrorFactory.network(0, url, error instanceof Error ? error.message : 'Unknown error'),
        );
      }
    }, config);
  }

  private async executeWithRetry<T>(
    operation: () => Promise<Result<T, NetworkError>>,
    config: RequestConfig,
  ): Promise<Result<T, NetworkError>> {
    let lastError: NetworkError | null = null;
    let delay = config.retryDelay!;

    for (let attempt = 0; attempt <= config.retries!; attempt++) {
      if (attempt > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= config.retryBackoff!;
      }

      const result = await operation();

      if (result.success) {
        return result;
      }

      lastError = result.error;

      // Don't retry if error is not retryable
      if (!result.error.isRetryable) {
        break;
      }
    }

    return Result.err(lastError!);
  }

  private async extractErrorMessage(response: Response): Promise<string> {
    try {
      const error = await response.json();
      return error.message || error.error || `HTTP ${response.status}`;
    } catch {
      return `HTTP ${response.status} ${response.statusText}`;
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, config?: RequestConfig): Promise<Result<T, NetworkError>> {
    return this.request(endpoint, { method: 'GET', ...config });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<Result<T, NetworkError>> {
    return this.request(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<Result<T, NetworkError>> {
    return this.request(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<Result<T, NetworkError>> {
    return this.request(endpoint, { method: 'DELETE', ...config });
  }
}

export const api = new ApiClient('/api');
```

## خُطّاف React للتعامل مع الأخطاء

أنشئ خُطّافًا شاملًا للتعامل مع الأخطاء:

```typescript
// hooks/useErrorHandler.ts
interface ErrorHandlerOptions {
  onError?: (error: AppError) => void;
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  enableReporting?: boolean;
}

interface ErrorState {
  error: AppError | null;
  isRetrying: boolean;
  retryCount: number;
  canRetry: boolean;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isRetrying: false,
    retryCount: 0,
    canRetry: false,
  });

  const {
    onError,
    enableRetry = true,
    maxRetries = 3,
    retryDelay = 1000,
    enableReporting = true,
  } = options;

  const handleError = useCallback(
    async (error: AppError, retryAction?: () => Promise<any>) => {
      // Report error if enabled
      if (enableReporting) {
        reportError(error);
      }

      // Call custom error handler
      onError?.(error);

      // Determine if retry is possible
      const canRetry =
        enableRetry &&
        retryAction !== undefined &&
        isRetryableError(error) &&
        errorState.retryCount < maxRetries;

      setErrorState({
        error,
        isRetrying: false,
        retryCount: errorState.retryCount,
        canRetry,
      });
    },
    [onError, enableRetry, maxRetries, errorState.retryCount, enableReporting],
  );

  const retry = useCallback(
    async (retryAction: () => Promise<any>) => {
      if (!errorState.canRetry || errorState.isRetrying) return;

      setErrorState((prev) => ({
        ...prev,
        isRetrying: true,
      }));

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, retryDelay));

      try {
        await retryAction();

        // Clear error on successful retry
        setErrorState({
          error: null,
          isRetrying: false,
          retryCount: 0,
          canRetry: false,
        });
      } catch (error) {
        setErrorState((prev) => ({
          ...prev,
          isRetrying: false,
          retryCount: prev.retryCount + 1,
          canRetry: prev.retryCount + 1 < maxRetries && isRetryableError(error as AppError),
        }));
      }
    },
    [errorState.canRetry, errorState.isRetrying, retryDelay, maxRetries],
  );

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isRetrying: false,
      retryCount: 0,
      canRetry: false,
    });
  }, []);

  return {
    ...errorState,
    handleError,
    retry,
    clearError,
  };
}

function isRetryableError(error: AppError): boolean {
  switch (error.type) {
    case 'network':
      return error.isRetryable;
    case 'system':
      return error.isRecoverable;
    default:
      return false;
  }
}

function reportError(error: AppError): void {
  // Send to error reporting service
  console.error('Error reported:', {
    code: error.code,
    message: error.message,
    type: error.type,
    timestamp: error.timestamp,
    correlationId: error.correlationId,
  });

  // Could send to Sentry, LogRocket, etc.
}
```

## حدّ أخطاء متقدّم

أنشئ حدّ أخطاء متطوّرًا مع إمكانية التعافي:

```typescript
// components/ErrorBoundary.tsx
interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
  lastErrorTime: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  isolate?: boolean;
  maxRetries?: number;
  resetTimeWindow?: number;
}

interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo;
  retry: () => void;
  canRetry: boolean;
  retryCount: number;
  errorId: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
      lastErrorTime: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const now = Date.now();
    const errorId = `ERR_${now}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      hasError: true,
      error,
      errorId,
      lastErrorTime: now
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;
    const { errorId } = this.state;

    // Enhanced error info
    const enhancedErrorInfo: ErrorInfo = {
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name
    };

    this.setState({ errorInfo: enhancedErrorInfo });

    // Report error
    onError?.(error, enhancedErrorInfo, errorId);

    // Log detailed error information
    console.group(`🚨 Error Boundary: ${errorId}`);
    console.error('Error:', error);
    console.error('Error Info:', enhancedErrorInfo);
    console.error('Props:', this.props);
    console.groupEnd();

    // Set up automatic reset
    this.scheduleReset();
  }

  private scheduleReset = () => {
    const { resetTimeWindow = 10000 } = this.props;

    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = window.setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: 0,
        lastErrorTime: 0
      }));
    }, resetTimeWindow);
  };

  private handleRetry = () => {
    const { maxRetries = 3, resetTimeWindow = 10000 } = this.props;
    const now = Date.now();

    // Reset retry count if enough time has passed
    const timeSinceLastError = now - this.state.lastErrorTime;
    const shouldResetCount = timeSinceLastError > resetTimeWindow;

    const newRetryCount = shouldResetCount ? 0 : this.state.retryCount + 1;

    if (newRetryCount >= maxRetries) {
      console.warn(`Max retries (${maxRetries}) exceeded for error boundary`);
      return;
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: newRetryCount,
      lastErrorTime: shouldResetCount ? 0 : this.state.lastErrorTime
    });
  };

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  render() {
    const { hasError, error, errorInfo, errorId, retryCount } = this.state;
    const { children, fallback: FallbackComponent, maxRetries = 3, isolate = false } = this.props;

    if (hasError && error && errorInfo) {
      const canRetry = retryCount < maxRetries;

      const fallbackProps: ErrorFallbackProps = {
        error,
        errorInfo,
        retry: this.handleRetry,
        canRetry,
        retryCount,
        errorId
      };

      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      return <DefaultErrorFallback {...fallbackProps} />;
    }

    // Isolate component tree if requested
    if (isolate) {
      return <div data-error-boundary>{children}</div>;
    }

    return children;
  }
}

// Default error fallback component
function DefaultErrorFallback({
  error,
  retry,
  canRetry,
  retryCount,
  errorId
}: ErrorFallbackProps) {
  return (
    <div className="error-boundary-fallback" role="alert">
      <div className="error-content">
        <h2>🚨 Something went wrong</h2>
        <details className="error-details">
          <summary>Error details</summary>
          <pre className="error-message">{error.message}</pre>
          <p className="error-id">Error ID: {errorId}</p>
          {retryCount > 0 && (
            <p className="retry-count">Retry attempt: {retryCount}</p>
          )}
        </details>

        <div className="error-actions">
          {canRetry && (
            <button
              onClick={retry}
              className="retry-button"
            >
              Try Again
            </button>
          )}

          <button
            onClick={() => window.location.reload()}
            className="reload-button"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};
```

## خُطّاف للعمليات غير المتزامنة مع التعامل مع الأخطاء

أنشئ خُطّافًا للتعامل مع العمليات غير المتزامنة مع تغطية شاملة للأخطاء:

```typescript
// hooks/useAsyncOperation.ts
interface AsyncState<T> {
  data: T | null;
  error: AppError | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AsyncOptions {
  immediate?: boolean;
  retries?: number;
  retryDelay?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: AppError) => void;
  throwOnError?: boolean;
}

export function useAsyncOperation<T, Args extends any[] = []>(
  operation: (...args: Args) => Promise<T>,
  options: AsyncOptions = {},
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const {
    immediate = false,
    retries = 0,
    retryDelay = 1000,
    onSuccess,
    onError,
    throwOnError = false,
  } = options;

  const execute = useCallback(
    async (...args: Args) => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        isSuccess: false,
        isError: false,
      }));

      let lastError: AppError | null = null;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }

          const result = await operation(...args);

          setState({
            data: result,
            error: null,
            isLoading: false,
            isSuccess: true,
            isError: false,
          });

          onSuccess?.(result);
          return result;
        } catch (error) {
          const appError =
            error instanceof Error
              ? ErrorFactory.network(0, 'operation', error.message)
              : ErrorFactory.network(0, 'operation', 'Unknown error');

          lastError = appError;

          // Don't retry on final attempt
          if (attempt === retries) {
            setState({
              data: null,
              error: appError,
              isLoading: false,
              isSuccess: false,
              isError: true,
            });

            onError?.(appError);

            if (throwOnError) {
              throw appError;
            }
          }
        }
      }

      return undefined;
    },
    [operation, retries, retryDelay, onSuccess, onError, throwOnError],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
  };
}
```

## التعامل مع الأخطاء على مستوى المكوّن

ادمج التعامل مع الأخطاء داخل المكوّنات:

```typescript
// components/UserProfile.tsx
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserProfileProps {
  userId: string;
}

function UserProfile({ userId }: UserProfileProps) {
  const { error, handleError, retry, clearError, canRetry } = useErrorHandler({
    enableRetry: true,
    maxRetries: 3
  });

  const {
    data: user,
    isLoading,
    isError,
    execute: fetchUser
  } = useAsyncOperation(
    async (id: string) => {
      const result = await api.get<User>(`/users/${id}`);

      return Result.match(
        result,
        (data) => data,
        (error) => {
          handleError(error, () => fetchUser(id));
          throw error;
        }
      );
    },
    { immediate: true }
  );

  const handleUpdateUser = async (updates: Partial<User>) => {
    try {
      const result = await api.put<User>(`/users/${userId}`, updates);

      Result.match(
        result,
        (updatedUser) => {
          // Success handling
          console.log('User updated successfully');
          fetchUser(userId); // Refresh user data
        },
        (error) => {
          handleError(error, () => handleUpdateUser(updates));
        }
      );
    } catch (error) {
      // This shouldn't happen with Result pattern, but just in case
      console.error('Unexpected error:', error);
    }
  };

  // Loading state
  if (isLoading && !user) {
    return <UserProfileSkeleton />;
  }

  // Error state with recovery options
  if (error) {
    return (
      <ErrorCard
        error={error}
        onRetry={canRetry ? () => retry(() => fetchUser(userId)) : undefined}
        onDismiss={clearError}
        title="Failed to load user profile"
      />
    );
  }

  // No user found
  if (!user) {
    return (
      <EmptyState
        icon="👤"
        title="User not found"
        description="The user you're looking for doesn't exist or has been deleted."
      />
    );
  }

  return (
    <div className="user-profile">
      <div className="user-header">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={user.name}
            onError={(e) => {
              // Handle image load errors
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <UserProfileForm
        user={user}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

// Error card component
interface ErrorCardProps {
  error: AppError;
  onRetry?: () => void;
  onDismiss?: () => void;
  title?: string;
}

function ErrorCard({
  error,
  onRetry,
  onDismiss,
  title = "An error occurred"
}: ErrorCardProps) {
  const getErrorIcon = (error: AppError) => {
    switch (error.type) {
      case 'network': return '🌐';
      case 'validation': return '⚠️';
      case 'business': return '🏢';
      case 'system': return '⚙️';
      default: return '❌';
    }
  };

  const getErrorColor = (severity: AppError['severity']) => {
    switch (severity) {
      case 'low': return 'text-yellow-600';
      case 'medium': return 'text-orange-600';
      case 'high': return 'text-red-600';
      case 'critical': return 'text-red-800';
    }
  };

  return (
    <div className={`error-card border-l-4 p-4 ${getErrorColor(error.severity)}`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{getErrorIcon(error)}</span>

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="mt-1 text-sm">{error.message}</p>

          <div className="mt-2 text-xs opacity-75">
            <span>Error ID: {error.correlationId}</span>
            <span className="ml-4">Time: {error.timestamp.toLocaleString()}</span>
          </div>

          <div className="mt-4 flex gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            )}

            {onDismiss && (
              <button
                onClick={onDismiss}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
```

## التعامل مع الأخطاء على مستوى التطبيق

اضبط معالجة أخطاء على نطاق التطبيق كلّه:

```typescript
// contexts/ErrorContext.tsx
interface ErrorContextType {
  errors: AppError[];
  addError: (error: AppError) => void;
  removeError: (correlationId: string) => void;
  clearAllErrors: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = useCallback((error: AppError) => {
    setErrors(prev => {
      // Prevent duplicate errors
      if (prev.some(e => e.correlationId === error.correlationId)) {
        return prev;
      }
      return [...prev, error];
    });

    // Auto-remove low severity errors
    if (error.severity === 'low') {
      setTimeout(() => {
        removeError(error.correlationId);
      }, 5000);
    }
  }, []);

  const removeError = useCallback((correlationId: string) => {
    setErrors(prev => prev.filter(e => e.correlationId !== correlationId));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorContext.Provider value={{
      errors,
      addError,
      removeError,
      clearAllErrors
    }}>
      {children}
      <ErrorToastContainer errors={errors} onRemove={removeError} />
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within ErrorProvider');
  }
  return context;
};

// Global error toast container
function ErrorToastContainer({ errors, onRemove }: {
  errors: AppError[];
  onRemove: (correlationId: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map(error => (
        <ErrorToast
          key={error.correlationId}
          error={error}
          onDismiss={() => onRemove(error.correlationId)}
        />
      ))}
    </div>
  );
};

function ErrorToast({ error, onDismiss }: {
  error: AppError;
  onDismiss: () => void;
}) {
  useEffect(() => {
    // Auto-dismiss after timeout based on severity
    const timeout = error.severity === 'critical' ? 15000 :
                   error.severity === 'high' ? 10000 :
                   error.severity === 'medium' ? 7000 : 5000;

    const timeoutId = setTimeout(onDismiss, timeout);
    return () => clearTimeout(timeoutId);
  }, [error.severity, onDismiss]);

  return (
    <div className={`
      max-w-sm bg-white border-l-4 rounded-lg shadow-lg p-4
      ${error.severity === 'critical' ? 'border-red-600' :
        error.severity === 'high' ? 'border-red-500' :
        error.severity === 'medium' ? 'border-yellow-500' : 'border-blue-500'}
    `}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-sm">{error.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {error.timestamp.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
```

## اختبار التعامل مع الأخطاء

اكتب اختبارات شاملة لحالات الأخطاء:

```typescript
// __tests__/errorHandling.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ErrorProvider } from '../contexts/ErrorContext';
import { UserProfile } from '../components/UserProfile';
import { ErrorFactory } from '../types/errors';
import * as api from '../api/client';

// Mock the API
jest.mock('../api/client');
const mockApi = api as jest.Mocked<typeof api>;

const renderWithErrorProvider = (component: React.ReactElement) => {
  return render(
    <ErrorProvider>
      {component}
    </ErrorProvider>
  );
};

describe('Error Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display error message when API call fails', async () => {
    const networkError = ErrorFactory.network(500, '/users/123', 'Internal Server Error');
    mockApi.get.mockResolvedValue({ success: false, error: networkError });

    renderWithErrorProvider(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load user profile')).toBeInTheDocument();
      expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
    });
  });

  it('should retry failed requests', async () => {
    const networkError = ErrorFactory.network(500, '/users/123', 'Internal Server Error');
    mockApi.get
      .mockResolvedValueOnce({ success: false, error: networkError })
      .mockResolvedValueOnce({
        success: true,
        data: { id: '123', name: 'John', email: 'john@example.com' }
      });

    renderWithErrorProvider(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Try Again'));

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    expect(mockApi.get).toHaveBeenCalledTimes(2);
  });

  it('should show different error styles based on severity', async () => {
    const criticalError = ErrorFactory.network(500, '/users/123', 'Critical Error');
    criticalError.severity = 'critical';

    mockApi.get.mockResolvedValue({ success: false, error: criticalError });

    renderWithErrorProvider(<UserProfile userId="123" />);

    await waitFor(() => {
      const errorCard = screen.getByText('Critical Error').closest('.error-card');
      expect(errorCard).toHaveClass('text-red-800');
    });
  });

  it('should handle network timeouts gracefully', async () => {
    const timeoutError = ErrorFactory.network(408, '/users/123', 'Request timeout', true);
    mockApi.get.mockResolvedValue({ success: false, error: timeoutError });

    renderWithErrorProvider(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Request timeout')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument(); // Should be retryable
    });
  });
});

// Test error boundary
describe('Error Boundary', () => {
  const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
      throw new Error('Test error');
    }
    return <div>No error</div>;
  };

  it('should catch and display errors', () => {
    const onError = jest.fn();

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('🚨 Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Test error' }),
      expect.any(Object),
      expect.any(String)
    );
  });

  it('should allow retry after error', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('🚨 Something went wrong')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Try Again'));

    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});
```

## مراقبة الأداء

راقب معدّلات الأخطاء والأداء:

```typescript
// utils/monitoring.ts
interface PerformanceMetric {
  operation: string;
  duration: number;
  success: boolean;
  error?: AppError;
  timestamp: Date;
}

class ErrorMonitor {
  private metrics: PerformanceMetric[] = [];
  private errorCounts = new Map<string, number>();

  recordOperation<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    const timestamp = new Date();

    return fn()
      .then((result) => {
        const duration = performance.now() - startTime;
        this.recordMetric({
          operation,
          duration,
          success: true,
          timestamp,
        });
        return result;
      })
      .catch((error) => {
        const duration = performance.now() - startTime;
        const appError = error as AppError;

        this.recordMetric({
          operation,
          duration,
          success: false,
          error: appError,
          timestamp,
        });

        this.incrementErrorCount(appError.code);
        throw error;
      });
  }

  private recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Send to analytics service
    this.sendToAnalytics(metric);
  }

  private incrementErrorCount(errorCode: string) {
    const count = this.errorCounts.get(errorCode) || 0;
    this.errorCounts.set(errorCode, count + 1);
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Send to your analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'operation', {
        event_category: 'performance',
        event_label: metric.operation,
        value: Math.round(metric.duration),
        custom_map: {
          success: metric.success,
          error_code: metric.error?.code,
        },
      });
    }
  }

  getErrorStats() {
    const totalOperations = this.metrics.length;
    const failedOperations = this.metrics.filter((m) => !m.success).length;
    const errorRate = totalOperations > 0 ? (failedOperations / totalOperations) * 100 : 0;

    return {
      totalOperations,
      failedOperations,
      errorRate: Math.round(errorRate * 100) / 100,
      topErrors: Array.from(this.errorCounts.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
    };
  }
}

export const errorMonitor = new ErrorMonitor();

// Usage in API calls
export const monitoredApi = {
  get: <T>(endpoint: string) =>
    errorMonitor.recordOperation(`GET ${endpoint}`, () => api.get<T>(endpoint)),

  post: <T>(endpoint: string, data: any) =>
    errorMonitor.recordOperation(`POST ${endpoint}`, () => api.post<T>(endpoint, data)),
};
```

## خلاصة أفضل الممارسات

1. **استخدم أخطاء مُحكَمة الأنواع** - أنشئ أنواع أخطاء شاملة بدلًا من كائنات `Error` عامّة
2. **نفّذ نمط `Result`** - اجعل التعامل مع الأخطاء صريحًا وآمنًا من ناحية الأنواع
3. **أضف منطق إعادة المحاولة** - أعد المحاولة تلقائيًا للأخطاء القابلة لإعادة المحاولة مع تراجع أُسّي (exponential backoff)
4. **قدّم تغذية راجعة للمستخدم** - اعرض رسائل خطأ ذات معنًى وخيارات للتعافي
5. **سجّل وراقب** - تتبّع معدّلات الأخطاء وأنماطها لأغراض التشخيص
6. **اختبر مسارات الخطأ** - اكتب اختبارات لحالات الأخطاء لا لمسارات النجاح وحدها
7. **استخدم حدود الأخطاء** - التقط أخطاء مكوّنات React وتعامل معها بلياقة
8. **أخفق مبكّرًا (Fail Fast)** - تحقّق من المدخلات مبكّرًا وقدّم تغذية راجعة فورية

مع هذه الأنماط، ستبني تطبيقات React تتعامل مع الأخطاء بلياقة، وتقدّم تجربة مستخدم ممتازة، وتمنحك معلومات التشخيص التي تحتاجها حين تسوء الأمور.
