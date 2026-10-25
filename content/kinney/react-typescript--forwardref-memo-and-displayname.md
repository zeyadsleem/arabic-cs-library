---
title: "`forwardRef` و`memo` و`displayName`"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/forwardref-memo-and-displayname"
---

`forwardRef` و`memo` و`displayName` في React هي أدوات رائعة لبناء مكوّنات سريعة الأداء وقابلة لإعادة الاستخدام. لكن حين تخلطها مع TypeScript — ولا سيما حين تبدأ في تركيبها معًا — تصبح الأمور معقّدة بسرعة. ينكسر استنتاج الأنواع، وتتلخّبط المعاملات العامة (generics)، وتبدأ واجهات مكوّناتك الجميلة في إبهار شكل حروف الأبجدية. لنُصلح ذلك.

بنهاية هذا الدليل، ستعرف كيف تركّب هذه الـ APIs دون أن تفقد أمان الأنواع، وكيف تُبقي أدوات التطوير (DevTools) مقروءة، وكيف تتجنّب المزالق الشائعة التي تجعل المطورين الآخرين يتساءلون عن قراراتك في الحياة.

## مشكلة المكوّنات من الرتبة العليا (Higher-Order Components) مع TypeScript

إليك ما يحدث عادةً عندما تحاول تركيب هذه الـ APIs:

```typescript
// ❌ This looks reasonable but has problems
const MyComponent = memo(
  forwardRef<HTMLInputElement, Props>((props, ref) => {
    return <input ref={ref} {...props} />;
  }),
);
```

ما الخطأ هنا؟ حسنًا، أشياء كثيرة:

1. **اسم العرض مفقود**: ستعرض أدوات التطوير (DevTools) `Anonymous` أو `ForwardRef(memo(...))`
2. **استنتاج المعاملات العامة (generics)**: إذا كان مكوّنك يستخدم معاملات عامة، سيتلخبط TypeScript بشأن الترتيب
3. **تعقيد الأنواع**: ينتج النوع النهائي فوضى من تواقيع الدوال الملفوفة
4. **ضعف IntelliSense**: يتضرّر الإكمال التلقائي عندما تكون الأنواع معقّدة أكثر من اللازم

لنعالج هذه المشكلات واحدة تلو الأخرى.

## فهم `forwardRef` مع TypeScript

يتيح لك `forwardRef` تمرير المراجع عبر مكوّنك إلى عناصر DOM أو إلى المكوّنات الأبناء. ومع TypeScript، عليك أن تكون صريحًا بشأن نوع المرجع الذي تمرّره.

```typescript
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

// ✅ Good: Explicit ref type
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => (
  <div>
    <label>{label}</label>
    <input ref={ref} {...props} />
  </div>
));
```

المعامل العام الأول (`HTMLInputElement`) يخبر TypeScript بنوع العنصر الذي يشير إليه المرجع. أما المعامل الثاني (`InputProps`) فيعرّف خصائص مكوّنك.

> **نصيحة**
>
> استخدم `ComponentPropsWithoutRef<'input'>` بدلًا من `HTMLProps<HTMLInputElement>` للحصول على أنواع الخصائص الصحيحة مع استبعاد خاصية `ref` (لأن `forwardRef` يتولّى ذلك).

### المكوّنات العامة مع `forwardRef`

تصبح الأمور أكثر تعقيدًا حين تريد مكوّنات عامة (generic components):

```typescript
// ✅ Generic forwardRef component
interface ListProps<T> extends ComponentPropsWithoutRef<'ul'> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Note: We need to cast the result to preserve generics
const List = forwardRef(
  <T,>({ items, renderItem, ...props }: ListProps<T>, ref: React.Ref<HTMLUListElement>) => (
    <ul ref={ref} {...props}>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  ),
) as <T>(props: ListProps<T> & { ref?: React.Ref<HTMLUListElement> }) => React.ReactElement;
```

هذا التأكيد على النوع (type assertion) في النهاية ضروري لأن `forwardRef` لا يتعامل بلطف مع الدوال العامة. إنه مطوّل، لكنه يحفظ واجهتك العامة.

## `memo`: متى تستخدمه وكيف

يمنع `React.memo` التصييرات غير الضرورية عبر تذكير مكوّنك (memoizing). وهو مكافئ React لـ `PureComponent` في حالة مكوّنات الدوال.

```typescript
import { memo } from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

// ✅ Simple memo usage
const UserCard = memo<UserCardProps>(({ name, email, avatar }) => (
  <div className="user-card">
    {avatar && <img src={avatar} alt={`${name}'s avatar`} />}
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  </div>
));
```

غالبًا يستطيع TypeScript استنتاج نوع الخصائص من مكوّنك، لكن التوضيح الصريح يساعد مع أنواع الخصائص المعقّدة.

### دوال المقارنة المخصّصة

أحيانًا تحتاج إلى منطق مخصّص لتحديد ما إذا كانت الخصائص قد تغيّرت:

```typescript
interface ExpensiveComponentProps {
  data: { id: string; value: number }[];
  threshold: number;
  onUpdate: (ids: string[]) => void;
}

const ExpensiveComponent = memo<ExpensiveComponentProps>(
  ({ data, threshold, onUpdate }) => {
    // Expensive computation here...
    const importantIds = data.filter((item) => item.value > threshold).map((item) => item.id);

    return (
      <div>
        {/* Complex rendering logic */}
        <button onClick={() => onUpdate(importantIds)}>Update Important Items</button>
      </div>
    );
  },
  // Custom comparison function
  (prevProps, nextProps) => {
    // Only re-render if data length changes or threshold changes
    return (
      prevProps.data.length === nextProps.data.length && prevProps.threshold === nextProps.threshold
    );
    // Note: We're ignoring onUpdate for this example
  },
);
```

> **تحذير**
>
> كن حذرًا مع دوال المقارنة المخصّصة. فهي تعمل عند كل تصيير، ويمكن أن تتحوّل إلى اختناقات أداء إذا كانت معقّدة أكثر من اللازم. كما أن تجاهل خصائص الدوال (مثل `onUpdate` أعلاه) قد يؤدي إلى إغلاقات قديمة (stale closures).

## `displayName`: جعل أدوات التطوير مقروءة

`displayName` أمر حاسم لأغراض التنقيح. من دونه، تعرض أدوات التطوير أسماء عامة تجعل التنقيح كابوسًا.

```typescript
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));

// ✅ Always set displayName for HOCs
Button.displayName = 'Button';

// With memo, it gets trickier:
const MemoizedButton = memo(Button);
MemoizedButton.displayName = 'memo(Button)';
```

وللتكوينات المعقّدة، كن وصفيًا:

```typescript
const ComplexButton = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => (
    <button ref={ref} {...props}>
      {children}
    </button>
  )),
);

// ✅ Clear, hierarchical display name
ComplexButton.displayName = 'memo(forwardRef(Button))';
```

## التركيب الصحيح لـ `forwardRef` و`memo`

الآن لنجمع كل ذلك معًا. إليك النمط الذي يعمل بثبات:

```typescript
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// Step 1: Create the base component with forwardRef
const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = `btn btn-${variant} btn-${size} ${className || ''}`.trim();

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

// Step 2: Wrap with memo
const Button = memo(ButtonBase);

// Step 3: Set display names
ButtonBase.displayName = 'Button';
Button.displayName = 'memo(Button)';

// Step 4: Export the memoized version
export { Button };
```

يقدّم لك هذا النهج:

- ✅ استنتاجًا صحيحًا من TypeScript
- ✅ أسماء مقروءة في أدوات التطوير
- ✅ تحسينًا للأداء
- ✅ شيفرة نظيفة وقابلة للصيانة

### المكوّنات العامة مع كلتا الـ APIين

بالنسبة إلى المكوّنات العامة، النمط مشابه لكنه يتطلّب تلك «رقصة» التأكيد على النوع:

```typescript
interface SelectProps<T> extends ComponentPropsWithoutRef<'select'> {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
}

// Step 1: Base component with forwardRef
const SelectBase = forwardRef(
  <T,>(
    { options, value, onChange, getOptionLabel, getOptionValue, ...props }: SelectProps<T>,
    ref: React.Ref<HTMLSelectElement>,
  ) => (
    <select
      ref={ref}
      value={value ? getOptionValue(value) : ''}
      onChange={(e) => {
        const selectedOption = options.find((option) => getOptionValue(option) === e.target.value);
        if (selectedOption) onChange(selectedOption);
      }}
      {...props}
    >
      {options.map((option) => (
        <option key={getOptionValue(option)} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  ),
) as <T>(props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> }) => React.ReactElement;

// Step 2: Wrap with memo
const Select = memo(SelectBase) as typeof SelectBase;

// Step 3: Display names
SelectBase.displayName = 'Select';
Select.displayName = 'memo(Select)';

export { Select };
```

التأكيد المزدوج على النوع (`memo(SelectBase) as typeof SelectBase`) يحفظ التوقيع العام عبر غلاف `memo`.

## المزالق الشائعة والحلول

### المزالق 1: ترتيب خاطئ في التركيب

```typescript
// ❌ Wrong: memo wrapping forwardRef loses ref forwarding
const BadComponent = forwardRef(memo<Props>((props) => <div>{/* ... */}</div>));

// ✅ Correct: forwardRef first, then memo
const GoodComponent = memo(
  forwardRef<HTMLDivElement, Props>((props, ref) => <div ref={ref}>{/* ... */}</div>),
);
```

### المزالق 2: أسماء العرض المفقودة

```typescript
// ❌ DevTools will show "ForwardRef" or "Anonymous"
const MyComponent = memo(forwardRef((props, ref) => <div />));

// ✅ Always set display names
const MyComponent = memo(forwardRef((props, ref) => <div />));
MyComponent.displayName = 'MyComponent';
```

### المزالق 3: الإفراط في استخدام `memo`

```typescript
// ❌ Don't memo components that always receive new props
const AlwaysNewProps = memo(({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}>Click me</button>
));

// Parent component:
// <AlwaysNewProps onClick={() => console.log('clicked')} /> // New function every render!

// ✅ Memo is pointless here—the function prop changes every time
const JustAButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}>Click me</button>
);
```

### المزالق 4: نسيان `useCallback` مع `memo`

```typescript
// ❌ memo is useless because handleClick changes every render
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount((c) => c + 1); // New function every render

  return <MemoizedChild onClick={handleClick} />;
};

// ✅ Stable callback makes memo effective
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => setCount((c) => c + 1), []);

  return <MemoizedChild onClick={handleClick} />;
};
```

## مثال من العالم الحقيقي: مكوّن إدخال قابل لإعادة الاستخدام

لنبنِ مكوّن إدخال شاملًا يوضّح كل هذه المفاهيم:

```typescript
import { forwardRef, memo, useId, type ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  helperText?: string;
}

// Base component with forwardRef
const InputBase = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const id = useId();
    const inputId = props.id || id;

    return (
      <div className="input-field">
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`input ${error ? 'input--error' : ''} ${className || ''}`}
          aria-describedby={error || helperText ? `${inputId}-description` : undefined}
          {...props}
        />
        {(error || helperText) && (
          <div id={`${inputId}-description`} className="input-description">
            {error && <span className="input-error">{error}</span>}
            {!error && helperText && <span className="input-helper">{helperText}</span>}
          </div>
        )}
      </div>
    );
  },
);

// Memoized version
const Input = memo(InputBase);

// Display names for DevTools
InputBase.displayName = 'Input';
Input.displayName = 'memo(Input)';

export { Input };
```

هذا المكوّن:

- **يمكن الوصول إليه**: تسمية صحيحة وخصائص ARIA
- **سريع الأداء**: مُذكَّر (memoized) لمنع التصييرات غير الضرورية
- **يدعم المراجع**: يمكن تركيز حقل الإدخال بشكل إجرائي
- **آمن الأنواع**: دعم كامل من TypeScript بأنواع خصائص صحيحة
- **قابل للتنقيح**: أسماء عرض واضحة في أدوات التطوير

## أنماط الاستخدام وأفضل الممارسات

### متى تستخدم كل API

**`forwardRef`**:

- ✅ بناء مكوّنات واجهة قابلة لإعادة الاستخدام (حقول إدخال، أزرار)
- ✅ إنشاء مكتبات مكوّنات
- ✅ حين تحتاج المكوّنات الأب إلى وصول إجرائي إلى عناصر DOM
- ❌ كل مكوّن (استخدمه فقط حين تكون المراجع مطلوبة فعلًا)

**`memo`**:

- ✅ المكوّنات التي تتلقّى خصائص مستقرة معظم الوقت
- ✅ المكوّنات المكلفة التي تُصيَّر كثيرًا
- ✅ المكوّنات داخل القوائم الكبيرة (بمفاتيح مستقرة)
- ❌ المكوّنات التي تتلقّى خصائص جديدة في كل مرة
- ❌ المكوّنات الرخيصة جدًا (فحص `memo` قد يكلّف أكثر من إعادة التصيير)

**`displayName`**:

- ✅ استخدمه دائمًا مع المكوّنات من الرتبة العليا (HOCs) مثل `memo` و`forwardRef`
- ✅ تركيبات المكوّنات المعقّدة
- ✅ مكتبات المكوّنات (لتحسين تجربة المطوّر)
- ❌ المكوّنات البسيطة بلا HOCs (يستنتج React الاسم من الدالة)

### اعتبارات الأداء

تذكّر أن `memo` و`forwardRef` كلاهما يضيف الحمل الضئيل:

```typescript
// ✅ Good use case: Expensive component with stable props
const ExpensiveChart = memo(
  forwardRef<SVGSVGElement, ChartProps>(({ data, width, height }, ref) => {
    // Complex chart rendering logic...
    return <svg ref={ref}>{/* ... */}</svg>;
  }),
);

// ❌ Probably overkill: Simple component
const SimpleDiv = memo(
  forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
    <div ref={ref}>{children}</div>
  )),
);
```

## التنقيح وأدوات التطوير

مع الاستخدام الصحيح لـ `displayName`، تبدو شجرة مكوّناتك هكذا:

```
App
├── memo(UserList)
│   ├── memo(forwardRef(UserCard))
│   ├── memo(forwardRef(UserCard))
│   └── memo(forwardRef(UserCard))
└── memo(forwardRef(SearchInput))
```

ومن دونه، تحصل على:

```
App
├── Anonymous
│   ├── ForwardRef
│   ├── ForwardRef
│   └── ForwardRef
└── ForwardRef
```

خمّن أيّهما أسهل في التنقيح عند الساعة الثانية فجرًا؟

## خاتمة

`forwardRef` و`memo` و`displayName` أدوات قويّة، لكنها سهلة إساءة الاستخدام أيضًا. والمفتاح هو فهم متى تقدّم كل منها قيمة:

- **`forwardRef`**: استخدمه حين تحتاج المراجع إلى المرور عبر مكوّنك
- **`memo`**: استخدمه للمكوّنات المكلفة ذات الخصائص المستقرة
- **`displayName`**: استخدمه دائمًا مع المكوّنات من الرتبة العليا لتحسين التنقيح

حين تدمجها بعناية مع TypeScript، تحصل على مكوّنات سريعة الأداء وآمنة الأنواع وقابلة للصيانة. وستشكرك نسختك المستقبلية (وزملاؤك) على الجهد الإضافي.

وتذكّر: التحسين المبكّر هو مصدر كل الشرور، لكن حين تحتاج فعلًا إلى هذه الأدوات فاستخدمها بشكل صحيح. ستفيدك الأنماط في هذا الدليل كثيرًا وأنت تبني تطبيقات React متينة باستخدام TypeScript.
