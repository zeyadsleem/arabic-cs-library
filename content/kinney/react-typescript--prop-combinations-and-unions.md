---
title: "تركيبات الخصائص والأنواع الاتحادية"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/prop-combinations-and-unions"
---

واجهات مكوّنات React عقود — فهي تحدّد أي تركيبات من الخصائص منطقية وأيها غير منطقي. لكننا كثيرًا ما نصمّم واجهات تسمح بمرور تركيبات بلا معنى، فتخلّق ارتباكًا وقت التشغيل وصعوبات في الصيانة. ويمنحنا TypeScript الأدوات لتشفير هذه القواعد مباشرةً في أنواعنا، بحيث تصبح الحالات غير الصالحة مستحيلةَ التمثيل حرفيًا.

وفي نهاية هذا الدليل ستصبح تعرف كيف تصمّم واجهات مكوّنات تسمح بالتركيبات الصالحة، وتقيّد المشكلة منها، وتشترط المجموعات الضرورية — كل ذلك مع توفير تجربة مطوّرين ممتازة عبر IntelliSense وأمان وقت الترجمة (compile-time).

## المشكلة مع الخصائص المتساهلة

تأمّل سيناريو شائعًا: مكوّن `Dialog` يمكن التحكم به أو يمكن أن يكون غير محكوم، بسلوكات مختلفة حسب طريقة استخدامه:

```typescript
// ❌ This allows confusing combinations
interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  // What happens when both open AND defaultOpen are provided?
  // What if open is provided without onOpenChange?
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  // Confusing logic to handle all the edge cases...
  const actualOpen = open !== undefined ? open : isOpen;

  return actualOpen ? <div>{children}</div> : null;
}
```

هذه الواجهة مرنة من الناحية التقنية، لكنها مربكة أيضًا. فليس هناك ما يمنع هذه التركيبات المشكِلة:

```typescript
// All of these compile but create unclear behavior
<Dialog open={true} defaultOpen={false} /> {/* Which wins? */}
<Dialog open={isOpen} /> {/* Missing onOpenChange handler */}
<Dialog onOpenChange={setOpen} /> {/* Handler but no way to control */}
```

## النمط 1: السماح بتركيبات محدّدة

يتعلق النمط الأول بإنشاء صيغ واضحة ومتبادلة الحصرية. إليك كيف تصمّم مكوّنًا يسمح بأنماط التحكم وعدم التحكم الصالحة فقط:

```typescript
type ControlledDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultOpen?: never; // Explicitly forbidden
};

type UncontrolledDialogProps = {
  defaultOpen?: boolean;
  open?: never; // Explicitly forbidden
  onOpenChange?: never; // Explicitly forbidden
};

type DialogProps = {
  children: React.ReactNode;
  title?: string;
} & (ControlledDialogProps | UncontrolledDialogProps);

function Dialog(props: DialogProps) {
  const { children, title } = props;

  // TypeScript narrows the type based on the presence of 'open'
  if ('open' in props) {
    // Controlled variant - TypeScript knows onOpenChange exists
    return (
      <dialog open={props.open}>
        {title && <h2>{title}</h2>}
        {children}
        <button onClick={() => props.onOpenChange(false)}>
          Close
        </button>
      </dialog>
    );
  }

  // Uncontrolled variant - manage state internally
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false);

  return (
    <dialog open={isOpen}>
      {title && <h2>{title}</h2>}
      {children}
      <button onClick={() => setIsOpen(false)}>
        Close
      </button>
    </dialog>
  );
}
```

يصبح الاستخدام واضحًا تمامًا:

```typescript
// ✅ Controlled - all required props present
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
>
  Content here
</Dialog>

// ✅ Uncontrolled - simple and self-contained
<Dialog defaultOpen={true}>
  Content here
</Dialog>

// ❌ These combinations are impossible
<Dialog open={true} defaultOpen={false} /> {/* TypeScript error */}
<Dialog open={isOpen} /> {/* Missing onOpenChange */}
```

> **نصيحة**
>
> استخدم النوع `never` لمنع خصائص معيّنة صراحةً في صيغ بعينها. هذا يجعل التنافر المتبادل واضحًا لكل من TypeScript والمطوّرين القارئين للشيفرة.

## النمط 2: التقييد بحسب الشروط

أحيانًا تريد تقييد بعض تركيبات الخصائص بحسب السياق. إليك مكوّن `Button` يتكيّف خصائصه المتاحة بحسب صيغته:

```typescript
type BaseButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

type PrimaryButtonProps = BaseButtonProps & {
  variant: 'primary';
  onClick: () => void;
  // Primary buttons must have click handlers
  href?: never;
  target?: never;
};

type SecondaryButtonProps = BaseButtonProps & {
  variant: 'secondary';
  onClick?: () => void; // Optional for secondary
  href?: never;
  target?: never;
};

type LinkButtonProps = BaseButtonProps & {
  variant: 'link';
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: never; // Links don't need onClick
};

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps | LinkButtonProps;

function Button(props: ButtonProps) {
  const { children, disabled, className, variant } = props;

  const baseClasses = `btn btn-${variant} ${className || ''}`;

  if (variant === 'link') {
    return (
      <a
        href={props.href}
        target={props.target}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}
```

يقيّد هذا التصميم تركيبات الخصائص بحسب السلوك المقصود للزر:

```typescript
// ✅ Primary buttons require onClick
<Button variant="primary" onClick={handleSubmit}>
  Submit Form
</Button>

// ✅ Link buttons require href
<Button variant="link" href="/dashboard" target="_blank">
  Go to Dashboard
</Button>

// ✅ Secondary buttons work with or without onClick
<Button variant="secondary">
  Cancel
</Button>

// ❌ Invalid combinations caught at compile time
<Button variant="primary" href="/somewhere" /> {/* href not allowed */}
<Button variant="link" onClick={handleClick} /> {/* onClick not allowed */}
```

## النمط 3: اشتراط الخصائص المترابطة

بعض الخصائص لا معنى لها إلا إذا استُعملت مع بعضها. إليك نمطًا لاشتراط التركيبات المترابطة باستخدام الأنواع الشرطية:

```typescript
type HasIcon<T> = T extends { icon: string }
  ? T & { 'aria-label': string } // Icon requires aria-label
  : T;

type HasTooltip<T> = T extends { tooltip: string }
  ? T & { 'aria-describedby'?: string } // Tooltip can have describedby
  : T;

type IconButtonProps = HasTooltip<HasIcon<{
  icon?: string;
  tooltip?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  onClick: () => void;
  children?: never; // Icon buttons don't show text
}>>;

function IconButton(props: IconButtonProps) {
  if (!props.icon) {
    // Without icon, this becomes a regular button
    // But TypeScript still enforces the constraints above
    return <button onClick={props.onClick} />;
  }

  return (
    <button
      onClick={props.onClick}
      aria-label={props['aria-label']} // Required when icon exists
      aria-describedby={props['aria-describedby']}
      title={props.tooltip}
    >
      <Icon name={props.icon} />
    </button>
  );
}
```

يوفّر الاستخدام متطلبات إمكانية الوصول:

```typescript
// ✅ Icon with required aria-label
<IconButton
  icon="search"
  aria-label="Search products"
  onClick={handleSearch}
/>

// ✅ Icon with tooltip and aria-label
<IconButton
  icon="help"
  tooltip="Get help with this feature"
  aria-label="Help"
  aria-describedby="help-tooltip"
  onClick={showHelp}
/>

// ❌ Icon without aria-label is caught
<IconButton icon="search" onClick={handleSearch} /> {/* Missing aria-label */}
```

## مثال من العالم الحقيقي: تركيبات حقول النماذج

لنبنِ مكوّن حقول نموذج شاملًا يوضّح الأنماط الثلاثة جميعها:

```typescript
type BaseFieldProps = {
  name: string;
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

// Pattern 1: Permit specific input types
type TextFieldProps = BaseFieldProps & {
  type: 'text' | 'email' | 'password' | 'tel';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  // These don't make sense for text inputs
  multiple?: never;
  options?: never;
};

type SelectFieldProps = BaseFieldProps & {
  type: 'select';
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  // Pattern 2: Limit multiple based on value type
  multiple?: boolean;
  // These don't make sense for selects
  placeholder?: never;
  maxLength?: never;
};

type FileFieldProps = BaseFieldProps & {
  type: 'file';
  value?: never; // File inputs handle their own state
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  // These don't make sense for file inputs
  placeholder?: never;
  maxLength?: never;
  options?: never;
};

// Pattern 3: Require validation when needed
type WithValidation<T> = T extends { required: true }
  ? T & { validationMessage?: string }
  : T;

type FieldProps = WithValidation<TextFieldProps | SelectFieldProps | FileFieldProps>;

function Field(props: FieldProps) {
  const { label, name, error, disabled, required } = props;

  const renderInput = () => {
    switch (props.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
        return (
          <input
            type={props.type}
            name={name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            disabled={disabled}
            required={required}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            value={props.value}
            onChange={(e) => {
              if (props.multiple) {
                const values = Array.from(e.target.selectedOptions).map(o => o.value);
                props.onChange(values);
              } else {
                props.onChange(e.target.value);
              }
            }}
            multiple={props.multiple}
            disabled={disabled}
            required={required}
          >
            {props.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'file':
        return (
          <input
            type="file"
            name={name}
            onChange={(e) => props.onChange(e.target.files)}
            accept={props.accept}
            multiple={props.multiple}
            disabled={disabled}
            required={required}
          />
        );
    }
  };

  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

يخلق هذا التصميم مكوّن حقول متينًا وآمنًا من ناحية الأنواع:

```typescript
// ✅ Text field with proper props
<Field
  type="email"
  name="email"
  label="Email Address"
  value={email}
  onChange={setEmail}
  placeholder="you@example.com"
  required
/>

// ✅ Multi-select with array value
<Field
  type="select"
  name="skills"
  label="Skills"
  value={selectedSkills}
  onChange={setSelectedSkills}
  options={skillOptions}
  multiple
/>

// ✅ File upload with proper handlers
<Field
  type="file"
  name="resume"
  label="Upload Resume"
  onChange={handleFileChange}
  accept=".pdf,.doc,.docx"
/>

// ❌ Invalid combinations prevented
<Field type="text" options={[]} /> {/* options not allowed on text */}
<Field type="select" placeholder="Choose" /> {/* placeholder not allowed on select */}
```

## النمط المتقدم: التحميلات الزائدة للدوال

للتحكم الأدقّ من ذلك، يمكنك استخدام التحميلات الزائدة للدوال (overloads) لتعريف تركيبات الخصائص بدقّة:

```typescript
// Define overloads for different use cases
function Toast(props: {
  type: 'success';
  message: string;
  duration?: number;
}): JSX.Element;

function Toast(props: {
  type: 'error';
  message: string;
  action?: { label: string; onClick: () => void };
  persistent?: true; // Error toasts can be persistent
}): JSX.Element;

function Toast(props: {
  type: 'loading';
  message: string;
  duration?: never; // Loading toasts don't auto-dismiss
  persistent?: true;
}): JSX.Element;

// Implementation handles all cases
function Toast(props: {
  type: 'success' | 'error' | 'loading';
  message: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
  persistent?: boolean;
}) {
  const { type, message, duration, action, persistent } = props;

  useEffect(() => {
    if (type === 'success' && !persistent && duration !== undefined) {
      const timer = setTimeout(() => dismiss(), duration);
      return () => clearTimeout(timer);
    }
  }, [type, persistent, duration]);

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      {action && (
        <button onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
```

## التحقق وقت التشغيل باستخدام Zod

للمكوّنات التي تستقبل خصائصها من مصادر خارجية، اجمع أنماط TypeScript مع التحقق وقت التشغيل:

```typescript
import { z } from 'zod';

const ControlledDialogSchema = z.object({
  open: z.boolean(),
  onOpenChange: z.function().args(z.boolean()).returns(z.void()),
  defaultOpen: z.undefined(),
});

const UncontrolledDialogSchema = z.object({
  defaultOpen: z.boolean().optional(),
  open: z.undefined(),
  onOpenChange: z.undefined(),
});

const DialogPropsSchema = z
  .object({
    children: z.any(),
    title: z.string().optional(),
  })
  .and(z.union([ControlledDialogSchema, UncontrolledDialogSchema]));

type DialogProps = z.infer<typeof DialogPropsSchema>;

function Dialog(props: DialogProps) {
  // Runtime validation for props from external sources
  const validatedProps = DialogPropsSchema.safeParse(props);

  if (!validatedProps.success) {
    throw new Error(`Invalid props: ${validatedProps.error.message}`);
  }

  // Your component logic here...
}
```

## متى تستخدم كل نمط

**أنماط السماح** تعمل بشكل أفضل حين:

- لديك أوضاع تشغيل متمايزة (محكوم مقابل غير محكوم)
- لدى الخصائص معانٍ مختلفة جوهريًا في سياقات مختلفة
- تريد منع الالتباس المفاهيمي

**أنماط التقييد** مثالية لـ:

- المكوّنات ذات الصيغ المتعدّدة التي تحتاج خصائص مختلفة
- منع الخصائص التي لا منطق في جمعها معًا
- إنشاء واجهات مركّزة ذات غرض واحد

**أنماط الاشتراط** تتألّق حين:

- يجب فرض متطلبات إمكانية الوصول
- للخصائص اعتماديات قويّة (مثل قواعد التحقق)
- تريد توجيه المطوّرين نحو أفضل الممارسات

## الأداء وقابلية الصيانة

هذه الأنماط بنى وقت ترجمة (compile-time) — فهي تضيف عبئًا صفريًا وقت التشغيل. لكن راعِ هذه المفاضلات:

- **الأنواع الاتحادية المعقّدة** قد تُبطئ ترجمة TypeScript في قواعد الشيفرة الكبيرة
- **الشروط المتداخلة بعمق** قد تنتج رسائل خطأ مربكة
- **الإفراط في هندسة** المكوّنات البسيطة يقلّل قابلية القراءة

الهدف هو استخدام هذه الأنماط بحكمة — حين تمنع أخطاءً حقيقية وتحسّن تجربة المطوّر، لا لمجرد أنك تستطيع.

## الأخطاء الشائعة

### تقييد الحالات البسيطة أكثر من اللازم

```typescript
// ❌ Overkill for a simple optional prop
type OverEngineered = { showIcon: true; iconName: string } | { showIcon: false; iconName?: never };

// ✅ Sometimes simple is better
type Simple = { showIcon?: boolean; iconName?: string };
```

### نسيان التطبيق الجزئي

```typescript
// ❌ This breaks when props are spread or partially applied
type StrictProps = { a: string } & { b: string };

// ✅ More resilient to partial application
type FlexibleProps = { a: string; b?: string } | { a?: string; b: string };
```

### جعل الصيانة أصعب

```typescript
// ❌ Brittle - adding new variants requires touching everything
type Variant = 'primary' | 'secondary' | 'danger';
type ButtonProps = Variant extends 'primary'
  ? PrimaryProps
  : Variant extends 'secondary'
    ? SecondaryProps
    : DangerProps;

// ✅ More maintainable union
type ButtonProps = PrimaryProps | SecondaryProps | DangerProps;
```

## الخطوات التالية

الآن وقد أصبحت قادرًا على تصميم واجهات مكوّنات دقيقة، فكّر في استكشاف:

- **أنماط القيود العامة** لتركيبات الخصائص القابلة لإعادة الاستخدام
- **أنواع النصوص الحرفية (template literal types)** للتحقق الديناميكي من الخصائص
- **الأنواع المُحوَّلة (mapped types)** لتحويل الواجهات القائمة
- **الأنواع المُعلَّمة (branded types)** لضمانات أقوى

تذكّر: أفضل واجهة برمجية لمكوّن هي التي تجعل الاستخدام الصحيح سهلًا والاستخدام الخاطئ مستحيلًا. تساعدك هذه الأنماط على بناء واجهة من هذا النوع مصفولة — استخدمها حين تضيف قيمة، لا حين تضيف تعقيدًا.
