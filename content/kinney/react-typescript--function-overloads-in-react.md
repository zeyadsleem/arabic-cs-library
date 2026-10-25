---
title: "الأحمال الزائدة للدوال واجهات برمجية مرنة"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/function-overloads-in-react"
---

تتيح لك الأحمال الزائدة للدوال (function overloads) في TypeScript تعريف أكثر من توقيع نوع واحد لدالة واحدة، مما يخلق واجهات برمجية تبدو بديهية وتتكيّف مع الطريقة التي يرغب المطورون فعلاً في استخدامها. في تطبيقات React، يترجم ذلك إلى مكوّنات وخُطّافات تعمل ببساطة بغض النظر عما إذا كنت تمرّر سلسلة نصية أو كائناً أو تركيبات مختلفة من الوسائط. سنستكشف كيفية تصميم واجهات مرنة وآمنة من ناحية الأنواع تجعل مكوّناتك بمستوى مكوّنات React المدمجة (built-ins).

فكّر في الأحمال الزائدة باعتبارها طريقة للقول: «هذه الدالة يمكن استدعاؤها بهذه الطرق المحددة، وسيعرف TypeScript تماماً ما يمكن توقعه في كل حالة». بدلاً من إجبار المستخدمين على واجهة برمجية جامدة واحدة، يمكنك دعم أنماط استدعاء متعددة مع الحفاظ على أمان أنواع كامل.

## المشكلة: واجهات جامدة مقابل الاستخدام الواقعي

اعتبر مكوّن `Button` بسيطاً يقبل إما سلسلة نصية أو كائن تهيئة:

```typescript
// ❌ Awkward: forces everyone into the same pattern
interface ButtonProps {
  config: string | { text: string; variant: 'primary' | 'secondary'; disabled?: boolean };
}

function Button({ config }: ButtonProps) {
  if (typeof config === 'string') {
    return <button>{config}</button>;
  }

  return (
    <button disabled={config.disabled} className={`btn-${config.variant}`}>
      {config.text}
    </button>
  );
}

// Usage feels clunky
<Button config="Click me" />
<Button config={{ text: "Submit", variant: "primary", disabled: false }} />
```

هذا يعمل، لكنه يبدو غير طبيعي. يضطر المستخدمون إلى تغليف السلاسل النصية البسيطة داخل كائن `config`، ولا يستطيع TypeScript توفير إكمال تلقائي دقيق بناءً على طريقة استدعائك للمكوّن.

## الأحمال الزائدة للدوال: توقيعات متعددة وتنفيذ واحد

تتيح لك الأحمال الزائدة تعريف عدة «توقيعات استدعاء» (call signatures) تشير جميعها إلى نفس الدالة الأساسية. وإليك كيف سنحسّن مكوّن Button:

```typescript
// ✅ Multiple call signatures
function Button(text: string): JSX.Element;
function Button(config: { text: string; variant: 'primary' | 'secondary'; disabled?: boolean }): JSX.Element;
function Button(textOrConfig: string | { text: string; variant: 'primary' | 'secondary'; disabled?: boolean }): JSX.Element {
  if (typeof textOrConfig === 'string') {
    return <button>{textOrConfig}</button>;
  }

  const { text, variant = 'primary', disabled = false } = textOrConfig;
  return (
    <button disabled={disabled} className={`btn-${variant}`}>
      {text}
    </button>
  );
}

// Usage feels natural
<Button text="Click me" />
<Button config={{ text: "Submit", variant: "primary" }} />
```

الآن يعرف TypeScript أنه عند تمرير سلسلة نصية ستحصل على زر أساسي. وعند تمرير كائن، يتوقع واجهة التهيئة الكاملة ويوفر الإكمال التلقائي لـ `variant` و`disabled`.

> **ملاحظة**
>
> يجب أن يكون التوقيع المنفِّذ (جسم الدالة الفعلي) متوافقاً مع جميع توقيعات الأحمال الزائدة. سيعرض TypeScript للمستخدمين توقيعات الأحمال الزائدة في IntelliSense فقط، وليس التوقيع المنفِّذ.

## نمط واقعي: خصائص مشروطة

إليك مثالاً أكثر تطوراً — مكوّن `Modal` يغيّر خصائصه بناءً على كونه متحكَّماً فيه (controlled) أو غير متحكَّم فيه (uncontrolled):

```typescript
interface BaseModalProps {
  title: string;
  children: React.ReactNode;
}

interface ControlledModalProps extends BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UncontrolledModalProps extends BaseModalProps {
  defaultOpen?: boolean;
}

// Overload signatures
function Modal(props: ControlledModalProps): JSX.Element;
function Modal(props: UncontrolledModalProps): JSX.Element;
function Modal(props: ControlledModalProps | UncontrolledModalProps): JSX.Element {
  // Type guards help us narrow the implementation
  if ('isOpen' in props) {
    // TypeScript knows this is ControlledModalProps
    const { isOpen, onClose, title, children } = props;
    return isOpen ? (
      <div className="modal">
        <div className="modal-content">
          <button onClick={onClose}>×</button>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    ) : null;
  }

  // TypeScript knows this is UncontrolledModalProps
  const { defaultOpen = false, title, children } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <button onClick={() => setIsOpen(false)}>×</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  ) : null;
}
```

يحصل المستخدمون على تجربة TypeScript مختلفة بناءً على نيتهم:

```typescript
// Controlled usage - TypeScript requires isOpen and onClose
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Settings"
>
  <SettingsForm />
</Modal>

// Uncontrolled usage - TypeScript knows onClose doesn't exist
<Modal
  defaultOpen={true}
  title="Welcome"
>
  <WelcomeMessage />
</Modal>
```

## الأحمال الزائدة للخُطّافات: إدارة حالة مرنة

تستفيد الخُطّافات المخصّصة من الأحمال الزائدة بشكل كبير. إليك خُطّاف `useLocalStorage` يعيد أشكالاً مختلفة بناءً على رغبتك في تضمين حالات التحميل:

```typescript
// Overload 1: Simple usage
function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void];

// Overload 2: With loading state
function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  includeLoading: true,
): [T, (value: T | ((prev: T) => T)) => void, boolean];

// Implementation
function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  includeLoading?: boolean,
):
  [T, (value: T | ((prev: T) => T)) => void] | [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const [loading, setLoading] = useState(includeLoading ? true : false);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(state) : value;
        setState(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setLoading(false);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, state],
  );

  useEffect(() => {
    if (includeLoading) {
      setLoading(false);
    }
  }, [includeLoading]);

  // TypeScript uses the overloads to determine the return type
  if (includeLoading) {
    return [state, setValue, loading];
  }

  return [state, setValue];
}
```

الآن يحصل المستخدمون على الواجهة البرمجية التي يتوقعونها تماماً:

```typescript
// Simple usage - no loading state
const [user, setUser] = useLocalStorage('user', null);

// With loading - includes loading boolean
const [settings, setSettings, isLoading] = useLocalStorage('settings', {}, true);

if (isLoading) {
  return <div>Loading settings...</div>;
}
```

## نمط متقدم: تابِعات محمّلة زائداً

يمكنك أيضاً استخدام الأحمال الزائدة مع توابِع الكائنات، وهو أمر مفيد بشكل خاص لأنماط الباني أو الواجهات المتسلسلة (fluent interfaces):

```typescript
class QueryBuilder<T> {
  private conditions: string[] = [];

  // Overload for single condition
  where(field: keyof T, operator: string, value: any): QueryBuilder<T>;
  // Overload for object condition
  where(conditions: Partial<Record<keyof T, any>>): QueryBuilder<T>;
  // Implementation
  where(
    fieldOrConditions: keyof T | Partial<Record<keyof T, any>>,
    operator?: string,
    value?: any,
  ): QueryBuilder<T> {
    if (typeof fieldOrConditions === 'object') {
      // Handle object conditions
      Object.entries(fieldOrConditions).forEach(([field, val]) => {
        this.conditions.push(`${String(field)} = ${JSON.stringify(val)}`);
      });
    } else {
      // Handle single condition
      this.conditions.push(`${String(fieldOrConditions)} ${operator} ${JSON.stringify(value)}`);
    }
    return this;
  }

  build(): string {
    return this.conditions.join(' AND ');
  }
}

// Usage supports both patterns
const query1 = new QueryBuilder<User>()
  .where('age', '>', 18)
  .where('status', '=', 'active')
  .build();

const query2 = new QueryBuilder<User>().where({ age: 25, status: 'active' }).build();
```

## الفخاخ وأفضل الممارسات

### يجب أن يعالج التنفيذ جميع الحالات

يجب أن تعالج دالة التنفيذ كل تركيبة ممكنة معرّفة في أحمالك الزائدة:

```typescript
// ❌ Implementation doesn't handle all overload cases
function processData(data: string): string;
function processData(data: number[]): number;
function processData(data: string | number[]): string | number {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  // Forgot to handle number[] case!
  // This will cause runtime errors
}

// ✅ Complete implementation
function processData(data: string): string;
function processData(data: number[]): number;
function processData(data: string | number[]): string | number {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }

  return data.reduce((sum, num) => sum + num, 0);
}
```

### الترتيب مهم

يفحص TypeScript الأحمال الزائدة من أعلى إلى أسفل ويستخدم أول تطابق:

```typescript
// ❌ Order can cause unexpected behavior
function format(value: any): string; // Too broad - matches everything
function format(value: number): string; // Never reached!
function format(value: string): string; // Never reached!

// ✅ Most specific first
function format(value: number): string;
function format(value: string): string;
function format(value: any): string;
```

### لا تبالغ في استخدام الأحمال الزائدة

أحياناً يكون نوع اتحادي بسيط أو نوع عام أوضح من الأحمال الزائدة:

```typescript
// ❌ Overloads for something simple
function getId(user: User): string;
function getId(id: string): string;
function getId(userOrId: User | string): string {
  return typeof userOrId === 'string' ? userOrId : userOrId.id;
}

// ✅ Simple union is clearer
function getId(userOrId: User | string): string {
  return typeof userOrId === 'string' ? userOrId : userOrId.id;
}
```

استخدم الأحمال الزائدة عندما ترغب في توفير أنواع إرجاع مختلفة جوهرياً أو عندما تكون أنماط الاستدعاء متباينة بما يكفي لتستحق واجهات منفصلة.

## متى تلجأ إلى الأحمال الزائدة

تتألق الأحمال الزائدة للدوال عندما يكون لديك:

- **أنواع إرجاع مختلفة بناءً على المدخلات**: مثل `useLocalStorage` الذي يعيد أطوالاً مختلفة للصفوف (tuples)
- **أنماط خصائص متعارضة بالكامل**: مكوّنات متحكَّم فيها مقابل غير متحكَّم فيها
- **تحسين تدريجي (progressive enhancement)**: الاستخدام الأساسي مقابل التهيئة المتقدمة
- **التوافق مع الإصدارات السابقة**: دعم واجهة برمجية قديمة بجانب ميزات جديدة

تحوّل الأحمال الزائدة واجهات TypeScript الجيدة إلى واجهات رائعة. فهي تتيح لك دعم أنماط استخدام متعددة دون التضحية بأمان الأنواع، مما يخلق مكوّنات وخُطّافات تبدو بديهية وتتكيّف مع الطريقة التي يرغب المطورون فعلاً في العمل بها. المفتاح هو إيجاد التوازن الصحيح — استخدمها عندما تحسّن تجربة المطور فعلاً، وليس لمجرد أنك تستطيع ذلك.

عند تصميمها بعناية، تصبح الدوال المحمّلة زائداً غير قابلة للتمييز عن واجهات React المدمجة. فلا يفكر المستخدمون في الأحمال الزائدة؛ بل يستخدمون واجهتك البرمجية بشكل طبيعي ويحصلون على تجربة TypeScript التي يتوقعونها بالضبط.
