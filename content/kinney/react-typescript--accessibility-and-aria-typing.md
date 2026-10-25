---
title: "الوصولية وتحديد أنواع ARIA"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/accessibility-and-aria-typing"
---

يتألّق TypeScript في التقاط الأخطاء وقت التصريف، لكنّ الوصولية (accessibility) غالبًا ما تُفحَص وقت التشغيل—إن مُيِّز لها فحص أصلًا. فماذا لو جعلنا حالات المكوّنات غير القابلة للوصول مستحيلة التصريف حرفيًا؟ بتقنيات TypeScript السليمة، يمكنك ترميز قيود ARIA (Accessible Rich Internet Applications) مباشرةً في أنواعك، بما يضمن أن تعمل قارئات الشاشة (screen readers) والتنقّل بلوحة المفاتيح بشكل صحيح قبل أن تُنفَّذ شيفرتك أصلًا.

سنتعرّف على كيفية الاستفادة من نظام أنواع TypeScript لفرض أفضل ممارسات الوصولية، وإنشاء واجهات الخصائص (props) الخاصة بـ ARIA آمنة الأنواع، وبناء مكوّنات (components) ترشد المطوّرين نحو أنماط التصميم الشموليّ. وفي النهاية، ستكتشف مخالفات الوصولية في بيئة التطوير لديك بدلًا من أثناء الاختبار (أو الأسوأ: في الإنتاج).

## لماذا نُرمِّز قيود الوصولية في الأنواع؟

قبل التعمّق في التنفيذ، لنحدّد أولًا لماذا من المهمّ ترميز قواعد الوصولية في TypeScript. تعتمد المقاربات التقليدية على أدوات الفحص وقت التشغيل مثل `eslint-plugin-jsx-a11y` أو على الاختبار اليدوي—وكلاهما ذو قيمة، لكنهما يلتقطان المشكلات بعد كتابة الشيفرة.

وتقدّم قيود الوصولية في TypeScript عدّة مزايا:

- **الأمان وقت التصريف**: التركيبات غير الصالحة من خصائص ARIA تصبح أخطاء TypeScript
- **تجربة المطوّر**: يرشدك IntelliSense إلى الاستخدام الصحيح لـ ARIA
- **التوثيق**: تصلح الأنواع توثيقًا حيًّا لمتطلبات الوصولية
- **أمان إعادة الهيكلة**: انكسار عقود الوصولية يتجلّى أثناء تعديل الشيفرة

انظر هذه المخالفة الشائعة للوصولية:

```typescript
// ❌ This compiles but creates accessibility issues
<button disabled aria-pressed="true">
  Toggle
</button>
```

زرٌّ معطَّل وعليه `aria-pressed` يسبّب ارتباكًا لقارئات الشاشة—فالعناصر المعطَّلة لا ينبغي أن تملك حالات ضغط. وبتحديد أنواع سليم، يتحوّل هذا إلى خطأ تصريف بدلًا من اكتشافٍ متأخّر وقت التشغيل.

## فهم ARIA في React

تقدّم خصائص ARIA (Accessible Rich Internet Applications) معلومات دلالية إلى التقنيات المساعدة. يدعم React كل خصائص ARIA، لكنّ أنواع TypeScript المدمجة لا تفرض العلاقات المعقّدة بينها.

هكذا يبدو تحديد أنواع ARIA الافتراضي في React:

```typescript
interface AriaAttributes {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-pressed'?: boolean | 'false' | 'true' | 'mixed';
  // ... many more
}
```

هذه الأنواع متساهلة—فهي تسمح بأي تركيبة من خصائص ARIA دون اعتبار للسياق أو للاستثناءات المتبادلة. أما الوصولية الفعلية فتتطلّب فهم العلاقات بين الخصائص، وأدوار العناصر (roles)، وحالات التفاعل.

## أنواع قيود ARIA الأساسية

لنبدأ بمثال بسيط: التأكد من أنّ الأزرار ذات وسمٍ سليم. فالزر يحتاج إما إلى محتوى نصّي ظاهر، وإما إلى `aria-label`، وإما إلى إشارة `aria-labelledby`.

```typescript
type ButtonLabelProps = {
  children: React.ReactNode;
} | {
  'aria-label': string;
} | {
  'aria-labelledby': string;
};

interface AccessibleButtonProps extends ButtonLabelProps {
  onClick: () => void;
  disabled?: boolean;
}

// ✅ All of these work
<AccessibleButton onClick={handleClick}>
  Save Changes
</AccessibleButton>

<AccessibleButton onClick={handleClick} aria-label="Close dialog" />

<AccessibleButton onClick={handleClick} aria-labelledby="save-label" />

// ❌ TypeScript error: button needs a label
<AccessibleButton onClick={handleClick} />
```

يضمن النوع الاتحادي (union type) هذا أنّ كل زرٍّ منشأ منها يملك شكلًا ما من الوسم القابل للقراءة ليست، فيلتقط الأزرار بلا وسم وقت التصريف.

## قيود حالة أزرار التبديل

تطرح أزرار التبديل (toggle buttons) تحديات مثيرة في تحديد الأنواع. فخاصية `aria-pressed` ألا تظهر إلا على الأزرار التي تُبدّل حالتها فعلًا، وأن تعكس قيمتها الحالة الراهنة.

```typescript
type ToggleButtonProps = {
  pressed: boolean;
  'aria-pressed': boolean;
  onToggle: (pressed: boolean) => void;
} | {
  // Regular button - no toggle state
  pressed?: never;
  'aria-pressed'?: never;
  onToggle?: never;
  onClick: () => void;
};

interface ButtonProps extends ToggleButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, ...props }) => {
  if ('onToggle' in props) {
    return (
      <button
        disabled={disabled}
        aria-pressed={props.pressed}
        onClick={() => props.onToggle(!props.pressed)}
      >
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} onClick={props.onClick}>
      {children}
    </button>
  );
};

// ✅ Toggle button with proper state
<Button pressed={isExpanded} onToggle={setIsExpanded} aria-pressed={isExpanded}>
  Expand Details
</Button>

// ✅ Regular button
<Button onClick={handleSave}>
  Save
</Button>

// ❌ TypeScript error: can't mix toggle and regular button props
<Button pressed={true} onClick={handleSave}>
  Invalid
</Button>
```

يمنع النوع الاتحادي المتمايز (discriminated union) هذا خلط نمط زر التبديل مع الزر العادي، ويضمن ظهور `aria-pressed` فقط مع إدارة الحالة المناسبة.

## ترابط عناصر النماذج

تحتاج عناصر التحكم في النماذج إلى وسمٍ سليم، وكثيرًا ما تحتاج إلى الإعلان عن الأخطاء. لننشئ أنواعًا تفرض هذه الارتباطات:

```typescript
type FormControlLabel = {
  id: string;
  'aria-labelledby': string;
} | {
  'aria-label': string;
  id?: string;
};

type FormControlError = {
  'aria-invalid': true;
  'aria-describedby': string;
} | {
  'aria-invalid'?: false | undefined;
  'aria-describedby'?: string;
};

interface TextInputProps extends FormControlLabel, FormControlError {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  required,
  ...ariaProps
}) => (
  <input
    id={id}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required={required}
    {...ariaProps}
  />
);

// ✅ Properly labeled input
<>
  <label htmlFor="email">Email Address</label>
  <TextInput
    id="email"
    value={email}
    onChange={setEmail}
    aria-labelledby="email"
  />
</>

// ✅ Input with error state
<TextInput
  aria-label="Username"
  value={username}
  onChange={setUsername}
  aria-invalid={true}
  aria-describedby="username-error"
/>

// ❌ TypeScript error: invalid input needs error description
<TextInput
  aria-label="Username"
  value={username}
  onChange={setUsername}
  aria-invalid={true}
  // Missing aria-describedby
/>
```

## قيود أدوار ARIA المتقدّمة

بعض العناصر تحمل علاقات ARIA معقّدة. فنوافذ الحوار المنبثقة (modal dialogs) مثلًا تتطلّب خصائص محدّدة وإدارةً للتركيز:

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  'aria-labelledby': string;
  'aria-describedby'?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  'aria-labelledby': labelledby,
  'aria-describedby': describedby,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledby}
      aria-describedby={describedby}
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>
  );
};

// ✅ Properly structured modal
<>
  <Modal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <h2 id="modal-title">Confirm Action</h2>
    <p id="modal-description">This action cannot be undone.</p>
    <button onClick={handleConfirm}>Confirm</button>
  </Modal>
</>;
```

يضمن نظام الأنواع أنّ النوافذ المنبثقة تحمل دومًا وسمًا سليمًا، ما يمنع الخطأ الشائع المتمثّل في نوافذ حوار بلا وسم.

## إنشاء مكتبات مكوّنات قابلة للوصول

عند بناء مكتبات المكوّنات (component libraries)، تكتسب قيود الوصولية قيمة أكبر. لننشئ نظام أزرار شاملًا:

```typescript
// Base button requirements
type ButtonRole = 'button' | 'switch' | 'tab';

type ButtonLabel = {
  children: React.ReactNode;
  'aria-label'?: never;
  'aria-labelledby'?: never;
} | {
  children?: never;
  'aria-label': string;
  'aria-labelledby'?: never;
} | {
  children?: never;
  'aria-label'?: never;
  'aria-labelledby': string;
};

// Role-specific constraints
type ButtonByRole<R extends ButtonRole> = R extends 'switch' ? {
  role: 'switch';
  'aria-checked': boolean;
  onClick: (checked: boolean) => void;
} : R extends 'tab' ? {
  role: 'tab';
  'aria-selected': boolean;
  'aria-controls': string;
  onClick: () => void;
} : {
  role?: 'button';
  onClick: () => void;
};

type AccessibleButtonProps<R extends ButtonRole = 'button'> =
  ButtonLabel &
  ButtonByRole<R> & {
    disabled?: boolean;
    className?: string;
  };

function AccessibleButton<R extends ButtonRole = 'button'>({
  role = 'button' as R,
  disabled,
  className,
  ...props
}: AccessibleButtonProps<R>) {
  if (role === 'switch') {
    const switchProps = props as ButtonByRole<'switch'>;
    return (
      <button
        role="switch"
        disabled={disabled}
        className={className}
        aria-checked={switchProps['aria-checked']}
        onClick={() => switchProps.onClick(!switchProps['aria-checked'])}
        {...(('children' in props) ? { children: props.children } : {})}
        {...(('aria-label' in props) ? { 'aria-label': props['aria-label'] } : {})}
        {...(('aria-labelledby' in props) ? { 'aria-labelledby': props['aria-labelledby'] } : {})}
      />
    );
  }

  if (role === 'tab') {
    const tabProps = props as ButtonByRole<'tab'>;
    return (
      <button
        role="tab"
        disabled={disabled}
        className={className}
        aria-selected={tabProps['aria-selected']}
        aria-controls={tabProps['aria-controls']}
        onClick={tabProps.onClick}
        {...(('children' in props) ? { children: props.children } : {})}
        {...(('aria-label' in props) ? { 'aria-label': props['aria-label'] } : {})}
        {...(('aria-labelledby' in props) ? { 'aria-labelledby': props['aria-labelledby'] } : {})}
      />
    );
  }

  const buttonProps = props as ButtonByRole<'button'>;
  return (
    <button
      disabled={disabled}
      className={className}
      onClick={buttonProps.onClick}
      {...(('children' in props) ? { children: props.children } : {})}
      {...(('aria-label' in props) ? { 'aria-label': props['aria-label'] } : {})}
      {...(('aria-labelledby' in props) ? { 'aria-labelledby': props['aria-labelledby'] } : {})}
    />
  );
}

// Usage examples with full type safety
<AccessibleButton>
  Regular Button
</AccessibleButton>

<AccessibleButton
  role="switch"
  aria-checked={isEnabled}
  onClick={setIsEnabled}
  aria-label="Enable notifications"
/>

<AccessibleButton
  role="tab"
  aria-selected={activeTab === 'settings'}
  aria-controls="settings-panel"
  onClick={() => setActiveTab('settings')}
>
  Settings
</AccessibleButton>
```

> **نصيحة**
>
> عند بناء مكتبات المكوّنات، ابدأ بأكثر الأنواع تقييدًا ممكنًا. فتخفيف القيود لاحقًا ممكن دائمًا، أما إضافة قيود إلى واجهات برمجية موجودة فيخلق تغييرات كاسِرة.

## التحقّق وقت التشغيل باستخدام Zod

لمزيد من الأمان، اربط قيود TypeScript بالتحقّق وقت التشغيل باستخدام Zod. هذا يلتقط مخالفات الوصولية الآتية من بيانات ديناميكية:

```typescript
import { z } from 'zod';

const ButtonPropsSchema = z
  .discriminatedUnion('role', [
    z.object({
      role: z.literal('button').optional(),
      onClick: z.function(),
      children: z.any().optional(),
      'aria-label': z.string().optional(),
    }),
    z.object({
      role: z.literal('switch'),
      'aria-checked': z.boolean(),
      onClick: z.function(),
      'aria-label': z.string(),
    }),
  ])
  .refine(
    (props) => {
      // Ensure button has some form of label
      if (props.role !== 'switch') {
        return props.children || props['aria-label'];
      }
      return props['aria-label'];
    },
    { message: 'Button must have accessible label' },
  );

const SafeButton: React.FC<z.infer<typeof ButtonPropsSchema>> = (props) => {
  // Runtime validation
  const validatedProps = ButtonPropsSchema.parse(props);

  return <AccessibleButton {...validatedProps} />;
};
```

يوفر هذا النهج أمانًا وقت التصريف ووقت التشغيل معًا، ويكون ذا قيمة خاصة عندما تأتي الخصائص من واجهات برمجية أو من ملفات إعداد.

## أنماط شائعة ومزالق

### خصائص ARIA الشرطية

قد ينبغي أحيانًا أن تظهر خصائص ARIA تحت شروط معيّنة فقط. استخدم الأنواع المعيَّنة (mapped types) للتعامل مع ذلك:

```typescript
type ConditionalAria<T extends boolean> = T extends true ? {
  'aria-expanded': boolean;
  'aria-controls': string;
} : {
  'aria-expanded'?: never;
  'aria-controls'?: never;
};

interface CollapsibleProps<T extends boolean = false> extends ConditionalAria<T> {
  isCollapsible: T;
  children: React.ReactNode;
}

// ✅ Collapsible section with proper ARIA
<Collapsible
  isCollapsible={true}
  aria-expanded={isExpanded}
  aria-controls="content-panel"
>
  Section Content
</Collapsible>

// ✅ Regular section without ARIA clutter
<Collapsible isCollapsible={false}>
  Static Content
</Collapsible>
```

### التركيبات غير الصالحة

استخدم النوع `never` لمنع تركيبات الخصائص غير الصالحة:

```typescript
type LinkOrButton =
  | {
      href: string;
      onClick?: never;
      type?: never;
    }
  | {
      href?: never;
      onClick: () => void;
      type?: 'button' | 'submit' | 'reset';
    };

// This prevents the classic "button with href" antipattern
interface ActionElementProps extends LinkOrButton {
  children: React.ReactNode;
  disabled?: boolean;
}
```

### اعتبارات الأداء

يحدث التحقّق من الأنواع في TypeScript وقت التصريف، فلا تؤثر قيود الوصولية المعقّدة على أداء وقت التشغيل. لكن انتبه إلى ما يلي:

- **وقت البناء**: قد تُبطئ الأنواع المعقّدة للغاية عملية تصريف TypeScript
- **حجم الحزمة**: التحقّق وقت التشغيل باستخدام Zod يزيد حجم الحزمة
- **تجربة المطوّر**: قد تُحبط الأنواع المفرطة في التقييد المطوّرين

> **تحذير**
>
> لا تدع الكمال في تحديد أنواع الوصولية يغدو عدوًّا للممارسة الجيدة للوصولية. ابدأ بالبساطة، وكرّر التحسين وفق احتياجات فريقك.

## اختبار أنواع الوصولية

ينبغي اختبار قيود الوصولية لديك كما تُختبر أي شيفرات أخرى. وهذا نهج يستخدم الأنواع المساعدة (utility types) في TypeScript:

```typescript
import { expectType } from 'tsd';

// Test valid button configurations
expectType<AccessibleButtonProps>({
  children: 'Click me',
  onClick: () => {},
});

expectType<AccessibleButtonProps>({
  'aria-label': 'Close',
  onClick: () => {},
});

// Test that invalid configurations don't compile
// This would cause a TypeScript error in your test file
/* 
expectType<AccessibleButtonProps>({
  onClick: () => {},
  // Missing label - should error
});
*/
```

فكّر في استخدام أدوات مثل `tsd` لاختبار الأنواع الرسمي، بما يضمن أنّ قيود الوصولية لديك تعمل كما يُتوقَّع.

## التكامل مع أنظمة التصميم

عند بناء أنظمة التصميم (design systems)، تتحوّل أنواع الوصولية إلى آلية توثيق وفرضٍ في آنٍ واحد. وهذا نمط لوصولية منهجية:

```typescript
// Define accessibility levels
type A11yLevel = 'AA' | 'AAA';

// Component metadata
interface ComponentA11y {
  level: A11yLevel;
  features: ('keyboard' | 'screen-reader' | 'high-contrast')[];
  wcagCriteria: string[];
}

// Attach metadata to components
const ButtonA11y: ComponentA11y = {
  level: 'AA',
  features: ['keyboard', 'screen-reader'],
  wcagCriteria: ['2.1.1', '4.1.2'],
};

// Runtime and build-time accessibility checks
const AccessibleButton: React.FC<AccessibleButtonProps> & {
  a11y: ComponentA11y;
} = (props) => {
  return <button {...props} />;
};

AccessibleButton.a11y = ButtonA11y;
```

بهذا تنشأ منهجية منظمة للوصولية تتوسّع عبر مكتبات المكوّنات الكبيرة.

## التكامل في الواقع العملي

هكذا تُدمج أنواع الوصولية في مشروع React قائم:

1. **ابدأ صغيرًا**: انطلق من المكوّنات الحساسة (الأزرار، النماذج، النوافذ المنبثقة)
2. **تبنٍّ تدريجي**: ابدأ بالأنواع العامة (generics) في البداية، ثم أضف القيود مع الوقت
3. **تثقيف الفريق**: وثّق الأنماط وقدّم أمثلة
4. **دمج الأدوات**: اضبط ESLint وPrettier ليعملا مع أنواعك
5. **استراتيجية الاختبار**: أدرج الوصولية في نهجك لاختبار المكوّنات

```typescript
// Example migration strategy
interface LegacyButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  // ... other props
}

// Extend existing interface with accessibility constraints
interface ModernButtonProps extends Omit<LegacyButtonProps, 'children'>, ButtonLabelProps {
  // New accessibility requirements
}

// Gradual migration helper
type ButtonProps = LegacyButtonProps | ModernButtonProps;
```

## الخطوات التالية

بما أنّك أدمجت الوصولية في نظام أنواعك، فقد ركعتَ أساسًا للتطوير الشموليّ الذي يتوسّع مع مستودع شيفرتك. فكّر في استكشاف:

- **قواعد ESLint مخصّصة** تفرض أنواع الوصولية لديك
- **تكامل مع Storybook** يتحقّق من الوصولية في توثيق مكوّناتك
- **فحوص وقت البناء** تمنع نشر شيفرة غير قابلة للوصول
- **أنماط متقدّمة** مثل المكوّنات متعدّدة الأشكال (polymorphic components) مع قيود وصولية

الهدف ليس التقاط كل مشكلة وصولية وقت التصريف—فذلك مستحيل وغير عملي. بل استخدم TypeScript لترميز أحرج الأنماط والعلاقات، منشئًا حواجز أمان ترشد المطوّرين نحو الحلول القابلة للوصول.

تذكّر: الوصولية تتعلّق في نهاية المطاف بالناس، لا بالأنواع وحدها. استخدم هذه التقنيات لدعم الممارسات الجيدة، لكن تحقّق دومًا مع مستخدمين حقيقيين وتقنيات مساعدة. يقدر TypeScript منع كثير من أخطاء الوصولية، لكنه لا يحلّ محل الاختبار البشري والتعاطف.
