---
title: "اختبار React مع TypeScript"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/testing-react-typescript"
---

قد يبدو اختبار مكوّنات React عبئًا ثقيلًا حين تكون غارقًا في تدفّق بناء المزايا. لكنّك حين تعمل مع TypeScript، يصبح الاختبار شبكة أمان لك — لا لالتقاط الأخطاء فحسب، بل لضمان أنّ واجهات مكوّناتك تعمل كما هو متوقّع وأنّ أنواعك تطابق الواقع فعلًا. وسنستكشف كيف تهيّئ بيئة اختبار متينة مع Jest أو Vitest، وكيف تستفيد من استعلامات React Testing Library الآمنة من حيث الأنواع، وكيف تكتب اختبارات تلتقط أنواع المشكلات التي لا يستطيع TypeScript وحده منعها.

وفي نهاية هذا الدليل ستملك إعداد اختبار يبدو طبيعيًا مع TypeScript — مع محاكاة سليمة، ومحاكاة أحداث المستخدم، وتقنيات لاختبار السلوك اللاتزامني من دون أن تفقد أمان الأنواع.

## لماذا يهمّ الاختبار أكثر مع TypeScript

يمنحك TypeScript ضمانات وقت التجميع، لكنّ هناك فجوة بين «هذا يُصرَّف» و«هذا يعمل فعلًا». ربّما يقبل مكوّنك الخصائص الصحيحة، لكنّ هل يصيّرها على نحو صحيح؟ وهل يتعامل مع تفاعلات المستخدم معالجةً سليمة؟ وهل يتصرّف وقت التشغيل بالطريقة التي توحي بها أنواعك؟

إليك ما لا يستطيع TypeScript التقاطه:

- **السلوك وقت التشغيل**: يُصرَّف مكوّنك لكنّه ينهار عندما ينقر المستخدم على زرّ
- **مشاكل التكامل**: الخصائص مُنمَّطة على نحو صحيح لكنّ المكوّن لا يستجيب للتغيّرات
- **التوقيت اللاتزامني**: اعتماديات `useEffect` مُنمَّطة لكنّها تسبّب حلقات لا نهائية
- **تجربة المستخدم**: المكوّن يعمل لكنّه غير قابل للاستخدام البتّة

يملأ الاختبار هذه الثغرات وهو يعمل *مع* إعدادك في TypeScript، لا ضدّه.

## تهيئة بيئة الاختبار

### الخيار 1: Vitest (مُستحسن للمشاريع الجديدة)

إذا كنت تبدأ من الصفر أو يمكنك الانتقال بسهولة، فإنّ [Vitest](https://vitest.dev/) يوفّر دعمًا ممتازًا لـ TypeScript من دون أيّ إعداد إضافي، ويتوافق بسلاسة مع إعدادات React المبنية على Vite.

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @vitejs/plugin-react jsdom
```

أنشئ ملف `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
});
```

### الخيار 2: Jest (للمشاريع القائمة)

بالنسبة إلى المشاريع التي تستخدم Jest أصلًا، ستحتاج إلى القليل من الإعداد الإضافي حتى يعمل TypeScript بسلاسة.

```bash
npm install -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D jest-environment-jsdom
```

أنشئ ملف `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapping: {
    // Handle CSS modules and other assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

### ملف تهيئة الاختبار

يحتاج كلا النهجين ملف تهيئة (`src/test-setup.ts`) لضبط React Testing Library:

```typescript
import '@testing-library/jest-dom';
```

وهذا يوفّر لك مُطابقات مُنمَّطة مثل `toBeInTheDocument()` و`toHaveTextContent()`.

## كتابة أول اختبار آمن من حيث الأنواع

لنبدأ بمكوّن بسيط ونبني التعقيد تدريجيًا:

```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant}`}
      data-testid="button"
    >
      {children}
    </button>
  );
};
```

الآن لنختبره بأمان كامل من حيث الأنواع:

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    // ✅ Type-safe query - TypeScript knows this returns HTMLElement | null
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn(); // or jest.fn() for Jest
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies variant classes correctly', () => {
    render(
      <Button onClick={() => {}} variant="secondary">
        Click me
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--secondary');
  });
});
```

لاحظ كيف يلتقط TypeScript المشكلات وقت التجميع:

```typescript
// ❌ TypeScript error: Type 'string' is not assignable to type '() => void'
render(<Button onClick="invalid">Click me</Button>);

// ❌ TypeScript error: Type '"invalid"' is not assignable to type '"primary" | "secondary"'
render(
  <Button onClick={() => {}} variant="invalid">
    Click me
  </Button>,
);
```

## الاستعلامات والمُطابقات الآمنة من حيث الأنواع

توفّر React Testing Library عدّة طرق للاستعلام، ولكلٍّ منها انعكاسات مختلفة على TypeScript:

```typescript
import { render, screen } from '@testing-library/react';

// Most specific queries return HTMLElement (never null)
const button = screen.getByRole('button'); // HTMLElement
const input = screen.getByLabelText('Email'); // HTMLElement

// "find" queries are async and return promises
const asyncElement = await screen.findByText('Loading...'); // HTMLElement

// "query" methods can return null
const maybeElement = screen.queryByText('Optional text'); // HTMLElement | null

// Working with specific element types
const textInput = screen.getByRole('textbox') as HTMLInputElement;
expect(textInput.value).toBe('expected value');

// Better: Use more specific queries when available
const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
expect(emailInput.type).toBe('email');
```

## اختبار الخصائص وواجهات مكوّنات البرمجة

يبرز TypeScript حقًّا عند اختبار عقود المكوّنات:

```typescript
// UserCard.tsx
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  showEmail?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, showEmail = false }) => {
  return (
    <div data-testid="user-card">
      <img src={user.avatar || '/default-avatar.png'} alt={`${user.name} avatar`} />
      <h3>{user.name}</h3>
      {showEmail && <p>{user.email}</p>}
      <button onClick={() => onEdit(user)}>Edit User</button>
    </div>
  );
};
```

اختبار هذا المكوّن بأمان TypeScript سليم:

```typescript
// UserCard.test.tsx
describe('UserCard', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('displays user information correctly', () => {
    const onEdit = vi.fn();

    render(<UserCard user={mockUser} onEdit={onEdit} showEmail />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    const avatar = screen.getByRole('img') as HTMLImageElement;
    expect(avatar.src).toBe(mockUser.avatar);
    expect(avatar.alt).toBe(`${mockUser.name} avatar`);
  });

  it('calls onEdit with correct user data', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();

    render(<UserCard user={mockUser} onEdit={onEdit} />);

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    // TypeScript ensures onEdit receives the right argument type
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });

  it('hides email when showEmail is false', () => {
    render(<UserCard user={mockUser} onEdit={vi.fn()} />);

    expect(screen.queryByText(mockUser.email)).not.toBeInTheDocument();
  });
});
```

## اختبار الخُطّافات مع TypeScript

الخُطّافات المخصّصة تحتاج إلى الاختبار أيضًا، ويساعدك TypeScript على التأكّد من أنّك تختبر العقد الصحيح:

```typescript
// useCounter.ts
import { useState, useCallback } from 'react';

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounter = (initialValue = 0): UseCounterReturn => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
};
```

اختبار الخُطّافات باستخدام `renderHook` من React Testing Library:

```typescript
// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());

    // TypeScript knows result.current has the correct shape
    expect(result.current.count).toBe(0);
    expect(typeof result.current.increment).toBe('function');
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('increments count correctly', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});
```

## المحاكاة الآمنة من حيث الأنواع

تتطلّب المحاكاة في TypeScript عنايةً إضافية للحفاظ على أمان الأنواع. وإليك أنماطًا تنجح جيّدًا:

### محاكاة الاعتماديات الخارجية

```typescript
// api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export const fetchUser = async (id: string): Promise<ApiResponse<User>> => {
  // Implementation...
};
```

```typescript
// UserProfile.test.tsx
import { vi } from 'vitest';
import { fetchUser } from '../api';
import { UserProfile } from './UserProfile';

// Type-safe mock
vi.mock('../api', () => ({
  fetchUser: vi.fn(),
}));

const mockFetchUser = vi.mocked(fetchUser);

describe('UserProfile', () => {
  beforeEach(() => {
    mockFetchUser.mockClear();
  });

  it('displays user data when API call succeeds', async () => {
    const mockResponse: ApiResponse<User> = {
      data: { id: '1', name: 'Jane Doe', email: 'jane@example.com' },
      status: 200,
      message: 'Success',
    };

    mockFetchUser.mockResolvedValue(mockResponse);

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    expect(mockFetchUser).toHaveBeenCalledWith('1');
  });

  it('handles API errors gracefully', async () => {
    mockFetchUser.mockRejectedValue(new Error('Network error'));

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/error loading user/i)).toBeInTheDocument();
    });
  });
});
```

### إنشاء مصانع للبدائل المُحاكاة

للأ objects المعقّدة، أنشئ مصانع آمنة من حيث الأنواع:

```typescript
// test-utils.ts
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

export const createMockApiResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  status: 200,
  message: 'Success',
});
```

```typescript
// Usage in tests
const mockUser = createMockUser({ name: 'Alice' });
const mockResponse = createMockApiResponse(mockUser);
```

## اختبار المكوّنات اللاتزامنية

يساعدك TypeScript على التقاط مشكلات التوقيت ومشاكل السلوك اللاتزامني:

```typescript
// AsyncUserList.tsx
interface AsyncUserListProps {
  onUserSelect: (user: User) => void;
}

export const AsyncUserList: React.FC<AsyncUserListProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <button onClick={() => onUserSelect(user)}>{user.name}</button>
        </li>
      ))}
    </ul>
  );
};
```

```typescript
// AsyncUserList.test.tsx
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';

describe('AsyncUserList', () => {
  it('shows loading state initially', () => {
    mockFetchUsers.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<AsyncUserList onUserSelect={vi.fn()} />);

    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('displays users after loading', async () => {
    const mockUsers = [
      createMockUser({ id: '1', name: 'Alice' }),
      createMockUser({ id: '2', name: 'Bob' }),
    ];

    mockFetchUsers.mockResolvedValue(createMockApiResponse(mockUsers));

    render(<AsyncUserList onUserSelect={vi.fn()} />);

    // Wait for loading to disappear
    await waitForElementToBeRemoved(() => screen.queryByText('Loading users...'));

    // Check users are displayed
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls onUserSelect when user is clicked', async () => {
    const onUserSelect = vi.fn();
    const mockUsers = [createMockUser({ name: 'Alice' })];

    mockFetchUsers.mockResolvedValue(createMockApiResponse(mockUsers));

    const user = userEvent.setup();
    render(<AsyncUserList onUserSelect={onUserSelect} />);

    await waitFor(() => screen.getByText('Alice'));

    await user.click(screen.getByRole('button', { name: 'Alice' }));

    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
  });
});
```

## أنماط الاختبار الشائعة والمزالق

### تجنّب `any` في الاختبارات

```typescript
// ❌ Loses type safety
const mockProps: any = { user: mockUser, onEdit: vi.fn() };

// ✅ Maintains type safety
const mockProps: UserCardProps = {
  user: mockUser,
  onEdit: vi.fn(),
};

// ✅ Even better: Use Partial for optional props
const mockProps: Partial<UserCardProps> = { user: mockUser };
```

### اختبار حدود الأخطاء

```typescript
// ErrorBoundary test
it('catches and displays errors', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  // Suppress console.error for this test
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>,
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

  spy.mockRestore();
});
```

### اختبار مزوّدي السياق

```typescript
// Custom render with context
const renderWithUserContext = (ui: React.ReactElement, user: User) => {
  return render(
    <UserContext.Provider value={{ user, setUser: vi.fn() }}>{ui}</UserContext.Provider>,
  );
};

// Usage
it('displays user name from context', () => {
  const user = createMockUser({ name: 'Context User' });
  renderWithUserContext(<UserGreeting />, user);

  expect(screen.getByText('Hello, Context User!')).toBeInTheDocument();
});
```

## اعتبارات اختبار الأداء

ولأنّ الأمر ليس متعلّقًا بـ TypeScript تحديدًا، فإنّ اختبار المكوّنات الحسّاسة للأداء يتطلّب مقاربات واعية بالأنواع:

```typescript
// MemoizedExpensiveComponent.test.tsx
import { render } from '@testing-library/react';
import { MemoizedExpensiveComponent } from './MemoizedExpensiveComponent';

describe('MemoizedExpensiveComponent', () => {
  it('only re-renders when props actually change', () => {
    const expensiveCalculation = vi.fn().mockReturnValue('calculated');

    const { rerender } = render(
      <MemoizedExpensiveComponent data={[1, 2, 3]} calculate={expensiveCalculation} />,
    );

    expect(expensiveCalculation).toHaveBeenCalledOnce();

    // Re-render with same props
    rerender(<MemoizedExpensiveComponent data={[1, 2, 3]} calculate={expensiveCalculation} />);

    // Should not call expensive calculation again
    expect(expensiveCalculation).toHaveBeenCalledOnce();
  });
});
```

## الخطوات التالية وأفضل الممارسات

إليك أبرز الخلاصات للحفاظ على أمان الأنواع في اختبارات React لديك:

### افعل

- استعمل `vi.mocked()` أو `jest.mocked()` للبدائل المُحاكاة الآمنة من حيث الأنواع
- أنشئ مصانع بدائل مُحاكاة بـ `Partial<T>` لبيانات اختبار مرنة
- اختبر عقد TypeScript، لا التنفيذ فحسب
- استعمل استعلامات محدّدة (`getByRole` و`getByLabelText`) بدل الاستعلامات العامة
- اختبر السلوك اللاتزامني مع `waitFor` وحدود أخطاء سليمة

### لا تفعل

- تلجأ إلى أنواع `any` في الاختبارات — فهي تُفرغ الغرض من العمل
- تحاكي كل شيء — بل اختبر التكامل حيث يكون ذلك منطقيًا
- تتجاهل أخطاء TypeScript في ملفات الاختبار
- تختبر تفاصيل التنفيذ التي يضمنها TypeScript أصلًا

### مواضيع متقدّمة تستحقّ الاستكشاف

- **الاختبار البصري الارتدادي (visual regression testing)**: أدوات مثل Chromatic تعمل بشكل ممتاز مع مكوّنات TypeScript
- **اختبار E2E**: كلٌّ من Playwright وCypress يوفّران دعمًا ممتازًا لـ TypeScript
- **الاختبار القائم على الخصائص (property-based testing)**: مكتبات مثل `fast-check` تستطيع توليد بيانات اختبار مُنمَّطة
- **اختبار المكوّنات**: اختبار المكوّنات بمعزل عن غيرها بأدوات مثل Storybook

الهدف ليس اختبار *كلّ* ما يضمنه TypeScript — بل اختبار الفجوات التي تلتقي فيها الأنواع بالسلوك وقت التشغيل. وعندما تُتقن هذا التوازن، تصير اختباراتك مكمّلًا قويًا لأمان TypeScript وقت التجميع، تلتقط المشكلات المهمة وتبقى قابلة للصيانة وسريعة.

مكوّناتك تعمل وقت التجميع ووقت التشغيل. وسيشكرك مستخدموك على ذلك.
