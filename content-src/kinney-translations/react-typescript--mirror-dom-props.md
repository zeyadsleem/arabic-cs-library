---
title: "محاكاة خصائص DOM"
---

بناء مكوّنات غلاف (wrapper components) حول عناصر DOM الأصلية هو أحد تلك الأمور التي تبدو بسيطة حتى تدرك أنك تحتاج إلى دعم جميع الخصائص. أنت تعرف الإجراء: تبني مكوّن `Button` جميلًا، ثم يحتاج أحدهم إلى `onClick`، ثم `disabled`، ثم `aria-label`، ثم `onMouseEnter`، وقبل أن تدري إنك تكتب يدويًا عشرات الخصائص التي يدعمها `<button>` الأصلي دعمًا مثاليًا.

وهنا يأتي `ComponentPropsWithoutRef` — نوع أدوات في React يمنحك جميع خصائص عنصر أصلي دون فوضى المراجع. وكأنك حصلت على تذكرة دعوة VIP إلى وليمة خصائص DOM مع إبقاء TypeScript راضيًا وإكمالك التلقائي سريعًا.

## المشكلة: تمرير الخصائص يدويًا

لنبدأ بالمنهج الشائع الذي يجعل حياة الجميع أصعب:

```typescript
// ❌ Bad - manually defining every prop you might need
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  // ... what about onMouseEnter? onFocus? aria-label?
  // This list gets unwieldy fast
}

function Button({ children, onClick, disabled, type, className, style }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
      style={style}
      // Oops, forgot to spread the rest props!
    >
      {children}
    </button>
  );
}
```

لهذا النهج عدة مشكلات:

- **ناقصة**: ستنسى حتمًا خصائص يحتاجها المستخدمون
- **عبء صيانة**: كل متطلب خاصية جديد يعني تحديث الواجهة
- **انزياح الأنواع**: قد لا تتطابق خصائصك المخصّصة مع سلوك عنصر DOM الفعلي
- **بلا إكمال تلقائي**: لا يحصل المستخدمون على IntelliSense لخصائص HTML القياسية

## الحل: ComponentPropsWithoutRef

`ComponentPropsWithoutRef` هو نوع أدوات يستخرج جميع الخصائص من نوع عنصر HTML معيّن، بطرح خاصية `ref` (التي سنتعامل معها على حدة عند الحاجة):

```typescript
import { ComponentPropsWithoutRef } from 'react';

// ✅ Good - get all button props automatically
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = `btn ${variantClass} ${sizeClass} ${className || ''}`.trim();

  return <button className={classes} {...props} />;
}
```

الآن يدعم مكوّن `Button` تلقائيًا كل خاصية تدعمها عناصر `<button>` الأصلية:

```typescript
// ✅ All of these work automatically with full TypeScript support
<Button onClick={() => console.log('clicked')}>Basic</Button>
<Button disabled>Disabled</Button>
<Button type="submit" form="my-form">Submit</Button>
<Button onMouseEnter={() => console.log('hover')} aria-label="Close dialog">
  ×
</Button>
<Button
  onKeyDown={(e) => e.key === 'Enter' && console.log('enter pressed')}
  tabIndex={0}
>
  Accessible
</Button>
```

## فهم سحر الأنواع

لنُطل على الآلية الداخلية لفهم ما يقدّمه `ComponentPropsWithoutRef` فعليًا:

```typescript
// This is roughly what ComponentPropsWithoutRef<'button'> expands to:
type ButtonElementProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
  tabIndex?: number;
  style?: React.CSSProperties;
  // ... and about 50+ more props
};
```

الجميل في الأمر أنك لا تحتاج إلى معرفة هذه القائمة أو صيانتها — تتولّى تعريفات أنواع React ذلك نيابةً عنك، وتبقى محدَّثة مع معايير الويب.

## العمل مع عناصر HTML مختلفة

يعمل `ComponentPropsWithoutRef` مع أي عنصر HTML. ما عليك سوى تغيير السلسلة الحرفية:

```typescript
// Input component
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
}

function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input className={`input ${error ? 'input--error' : ''} ${className || ''}`} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Div wrapper component
interface CardProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  actions?: React.ReactNode;
}

function Card({ title, actions, children, className, ...props }: CardProps) {
  return (
    <div className={`card ${className || ''}`} {...props}>
      <header className="card-header">
        <h3>{title}</h3>
        {actions && <div className="card-actions">{actions}</div>}
      </header>
      <div className="card-content">{children}</div>
    </div>
  );
}
```

## التعامل بأناقة مع تعارض الخصائص

أحيانًا قد تتعارض خصائصك المخصّصة مع خصائص DOM الأصلية. إليك كيفية التعامل مع ذلك:

```typescript
// What if your custom 'size' conflicts with the native 'size' attribute?
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  // Our custom size prop (different from input's native size)
  inputSize?: 'sm' | 'md' | 'lg';
}

function Input({ label, inputSize = 'md', ...props }: InputProps) {
  // Native 'size' prop is still available in ...props if needed
  return (
    <div>
      <label>{label}</label>
      <input className={`input input--${inputSize}`} {...props} />
    </div>
  );
}

// Usage:
<Input
  label="Username"
  inputSize="lg" // Our custom size
  size={20} // Native size attribute (character width)
  maxLength={50} // Native maxLength works too
/>;
```

وإذا احتجت إلى تجاوز خاصية أصلية تمامًا، استخدم `Omit`:

```typescript
interface CustomButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> {
  // Replace the native onClick with our own signature
  onClick: (buttonType: string) => void;
  buttonType: string;
}

function CustomButton({ onClick, buttonType, ...props }: CustomButtonProps) {
  return <button {...props} onClick={() => onClick(buttonType)} />;
}
```

## إضافة دعم `forwardRef`

حين تحتاج إلى تمرير المراجع، اجمع بين `ComponentPropsWithoutRef` و`forwardRef`:

```typescript
import { forwardRef, ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const classes = `btn btn--${variant} btn--${size} ${className || ''}`.trim();

    return <button ref={ref} className={classes} {...props} />;
  },
);

Button.displayName = 'Button';
```

الآن يدعم مكوّنك المراجع *و*كل خصائص الزر الأصلية:

```typescript
function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Button
      ref={buttonRef}
      onClick={() => buttonRef.current?.focus()}
      onMouseEnter={() => console.log('hovered')}
      disabled={false}
      type="button"
      aria-label="Focus me"
    >
      Click to focus myself
    </Button>
  );
}
```

## مثال من العالم الحقيقي: بناء مكوّن رابط

إليك مثالًا شاملًا يوضّح `ComponentPropsWithoutRef` في العمل:

```typescript
import { forwardRef, ComponentPropsWithoutRef } from 'react';

// Support both internal links (to) and external links (href)
type BaseLinkProps = ComponentPropsWithoutRef<'a'>;

interface InternalLinkProps extends Omit<BaseLinkProps, 'href'> {
  to: string;
  external?: false;
}

interface ExternalLinkProps extends Omit<BaseLinkProps, 'href'> {
  href: string;
  external: true;
  openInNewTab?: boolean;
}

type LinkProps = InternalLinkProps | ExternalLinkProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  if (props.external) {
    const { href, openInNewTab = true, ...rest } = props;
    return (
      <a
        ref={ref}
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        {...rest}
      />
    );
  }

  const { to, ...rest } = props;
  // In a real app, you'd use your router's Link component here
  return <a ref={ref} href={to} {...rest} />;
});

Link.displayName = 'Link';

// Usage with full type safety and autocomplete:
<Link to="/dashboard" className="nav-link">
  Dashboard
</Link>

<Link
  external
  href="https://example.com"
  onMouseEnter={() => console.log('external link hovered')}
  aria-label="Visit external site"
>
  External Site
</Link>
```

## النمط المتقدّم: المكوّنات متعددة الأشكال

لأقصى قدر من المرونة، يمكنك إنشاء مكوّنات قادرة على التصيير كعناصر HTML مختلفة:

```typescript
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';

interface PolymorphicProps<T extends ElementType> {
  as?: T;
  variant?: 'primary' | 'secondary';
}

type PolymorphicComponentProps<T extends ElementType> =
  PolymorphicProps<T> & ComponentPropsWithoutRef<T>;

const PolymorphicComponent = forwardRef(
  <T extends ElementType = 'div'>(
    { as, variant = 'primary', className, ...props }: PolymorphicComponentProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || 'div';
    const classes = `component component--${variant} ${className || ''}`.trim();

    return <Component ref={ref} className={classes} {...props} />;
  }
);

// Usage: same component, different elements, all properly typed
<PolymorphicComponent>Default div</PolymorphicComponent>
<PolymorphicComponent as="button" onClick={() => alert('clicked')}>
  Button variant
</PolymorphicComponent>
<PolymorphicComponent as="a" href="/link">
  Link variant
</PolymorphicComponent>
```

> **ملاحظة**
>
> المكوّنات متعددة الأشكال قويّة لكنها معقّدة. استخدمها باعتدال — معظم المكوّنات تعمل بشكل أفضل مع نوع عنصر ثابت.

## الأنماط الشائعة وأفضل الممارسات

### النمط 1: مكوّن الغلاف

مثالي لإضافة التنسيق أو السلوك إلى العناصر الأصلية:

```typescript
interface StyledInputProps extends ComponentPropsWithoutRef<'input'> {
  variant?: 'outline' | 'filled' | 'underline';
}

function StyledInput({ variant = 'outline', className, ...props }: StyledInputProps) {
  return <input className={`input input--${variant} ${className || ''}`} {...props} />;
}
```

### النمط 2: المكوّن المحسَّن

إضافة وظائف مع الحفاظ على الواجهة الأصلية:

```typescript
interface AutoResizeTextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  minRows?: number;
  maxRows?: number;
}

function AutoResizeTextarea({
  minRows = 1,
  maxRows = 10,
  style,
  onChange,
  ...props
}: AutoResizeTextareaProps) {
  const [rows, setRows] = useState(minRows);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Auto-resize logic here...
    const newRows = Math.min(maxRows, Math.max(minRows /* calculated rows */));
    setRows(newRows);
    onChange?.(e);
  };

  return (
    <textarea rows={rows} style={{ resize: 'none', ...style }} onChange={handleChange} {...props} />
  );
}
```

### النمط 3: المكوّن المركّب

بناء مكوّنات معقّدة من مكوّنات بسيطة:

```typescript
interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
  error?: string;
  required?: boolean;
}

function FormField({ label, error, required, children, className, ...props }: FormFieldProps) {
  return (
    <div className={`form-field ${className || ''}`} {...props}>
      <label className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

// Usage:
<FormField label="Email" required error={emailError}>
  <StyledInput type="email" name="email" />
</FormField>;
```

## اعتبارات الأداء

`ComponentPropsWithoutRef` له كلفة تشغيل ضئيلة لأنه مجرّد بنية على مستوى الأنواع. لكن هناك بعض الأمور التي ينبغي مراعاتها:

```typescript
// ✅ Good - destructuring commonly used props
function Button({ disabled, className, ...props }: ButtonProps) {
  // Process disabled and className specifically
  return <button disabled={disabled} className={processClassName(className)} {...props} />;
}

// ❌ Less ideal - spreading everything always
function Button(props: ButtonProps) {
  // This works but you lose the ability to process specific props
  return <button {...props} />;
}
```

## نصائح التنقيح

حين تسوء الأمور مع أنواع الخصائص، تساعدك هذه الأنماط على التنقيح:

```typescript
// Add type assertions to understand what you're working with
function debugComponent(props: ComponentPropsWithoutRef<'button'>) {
  // Hover over this in your IDE to see all available props
  const allProps: typeof props = props;
  console.log('Available props:', Object.keys(allProps));

  return <button {...props} />;
}

// Use satisfies to ensure your component meets the interface
const MyButton = ((props) => {
  return <button {...props} />;
}) satisfies React.FC<ComponentPropsWithoutRef<'button'>>;
```

## ترسانة أنواع DOM في React

في حين أن `ComponentPropsWithoutRef` هو خيارك الأول في معظم الحالات، يوفّر React مجموعة من أدوات ربط DOM أكثر تخصّصًا. وفهم متى ولماذا تستخدم كل واحدة منها سيرفع مستواك في TypeScript.

### مقارنة بين HTMLAttributes وHTMLProps وAllHTMLAttributes

توفّر هذه الأنواع مستويات مختلفة من دعم خصائص HTML، ولكل منها حالات استخدام محدّدة:

```typescript
import { HTMLAttributes, HTMLProps, AllHTMLAttributes } from 'react';

// HTMLAttributes: Standard HTML attributes without form-specific props
interface DivWrapperProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'panel';
}

// HTMLProps: HTMLAttributes + form element props (value, checked, etc.)
interface CustomInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

// AllHTMLAttributes: Union of all possible HTML attributes
interface GenericWrapperProps extends AllHTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}
```

لنُفصّل الفروقات:

### HTMLAttributes: الأساس

يتضمّن `HTMLAttributes` جميع خصائص HTML الشائعة لكنه يستثني الخصائص الخاصة بنوع العنصر:

```typescript
// HTMLAttributes includes these common props:
interface HTMLAttributes<T> {
  // Core attributes
  className?: string;
  id?: string;
  style?: CSSProperties;

  // Event handlers
  onClick?: MouseEventHandler<T>;
  onMouseEnter?: MouseEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;

  // ARIA and data attributes
  'aria-label'?: string;
  'data-testid'?: string;

  // And many more...
  // But NOT element-specific like 'value', 'checked', 'href', etc.
}

// Perfect for wrapper components that don't need specific element props
function Panel<T extends HTMLElement = HTMLDivElement>({
  children,
  className,
  ...props
}: HTMLAttributes<T> & { children?: ReactNode }) {
  return (
    <div className={`panel ${className || ''}`} {...props}>
      {children}
    </div>
  );
}
```

### HTMLProps: الحزمة الكاملة

يوسّع `HTMLProps` نوع `HTMLAttributes` بالخصائص الخاصة بنوع العنصر. وهذا هو ما يستخدمه `ComponentPropsWithoutRef` في الخلفية:

```typescript
// HTMLProps includes everything from HTMLAttributes PLUS element-specific props
type InputHTMLProps = HTMLProps<HTMLInputElement>;
// Includes: value, checked, type, placeholder, etc.

type AnchorHTMLProps = HTMLProps<HTMLAnchorElement>;
// Includes: href, target, rel, download, etc.

// Use HTMLProps when you need ALL props including element-specific ones
interface EnhancedInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
}

function EnhancedInput({ label, error, ...inputProps }: EnhancedInputProps) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input {...inputProps} className={error ? 'error' : ''} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// All input-specific props work:
<EnhancedInput
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  required
  placeholder="Enter your email"
/>;
```

### AllHTMLAttributes: كل الصفات مجتمعة

`AllHTMLAttributes` هو اتحاد جميع خصائص عناصر HTML. استخدمه عند بناء مكوّنات عامة بدرجة عالية:

```typescript
// AllHTMLAttributes includes EVERY possible HTML attribute
interface GenericElementProps extends AllHTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}

function GenericElement({
  as: Component = 'div',
  ...props
}: GenericElementProps) {
  return <Component {...props} />;
}

// Can use ANY HTML attribute
<GenericElement as="input" type="text" value="test" />
<GenericElement as="a" href="/home" target="_blank" />
<GenericElement as="button" onClick={() => {}} disabled />
```

> **تحذير**
>
> قد يؤدّي `AllHTMLAttributes` إلى واجهات مُربكة لأنه يسمح بأي خاصية HTML مهما كان نوع العنصر. استخدمه باعتدال وفضّل الأنواع الأدقّ كلما أمكن.

### JSX.IntrinsicElements: خرائط عناصر آمنة الأنواع

يوفّر `JSX.IntrinsicElements` خريطة تربط أسماء عناصر HTML بأنواع خصائصها:

```typescript
// JSX.IntrinsicElements maps element names to their prop types
type DivProps = JSX.IntrinsicElements['div'];
type InputProps = JSX.IntrinsicElements['input'];
type ButtonProps = JSX.IntrinsicElements['button'];

// Use it to create type-safe element factories
function createElement<K extends keyof JSX.IntrinsicElements>(
  type: K,
  props: JSX.IntrinsicElements[K],
): ReactElement {
  return React.createElement(type, props);
}

// Type-safe based on element type
createElement('input', { type: 'text', value: 'test' }); // ✅
createElement('div', { type: 'text' }); // ❌ Type error: div doesn't have 'type'
```

وهذا قويّ للغاية لبناء مكوّنات متعددة الأشكال بأمان أنواع كامل:

```typescript
// Type-safe polymorphic component using JSX.IntrinsicElements
interface PolymorphicProps<T extends keyof JSX.IntrinsicElements> {
  as?: T;
  children?: ReactNode;
}

type PolymorphicComponentProps<T extends keyof JSX.IntrinsicElements> =
  PolymorphicProps<T> & JSX.IntrinsicElements[T];

function Polymorphic<T extends keyof JSX.IntrinsicElements = 'div'>({
  as,
  children,
  ...props
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
}

// Type-safe usage - props are validated based on 'as' prop
<Polymorphic as="button" onClick={() => {}} disabled>
  Button
</Polymorphic>

<Polymorphic as="a" href="/home" target="_blank">
  Link
</Polymorphic>

<Polymorphic as="input" type="text" value="test" />
```

### اختيار النوع الصحيح: مصفوفة قرار

إليك متى تستخدم كل نوع من أنواع DOM المساعدة:

```typescript
// Use ComponentPropsWithoutRef for most wrapper components
interface ButtonWrapperProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
}

// Use HTMLAttributes when you DON'T need element-specific props
interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

// Use HTMLProps when you need EVERYTHING (rare)
interface SuperInputProps extends HTMLProps<HTMLInputElement> {
  validate?: (value: string) => boolean;
}

// Use AllHTMLAttributes for highly generic components (use sparingly)
interface GenericProps extends AllHTMLAttributes<HTMLElement> {
  component?: string;
}

// Use JSX.IntrinsicElements for type-safe polymorphism
type ButtonOrLinkProps =
  ({ as: 'button' } & JSX.IntrinsicElements['button']) | ({ as: 'a' } & JSX.IntrinsicElements['a']);
```

### مثال من العالم الحقيقي: بناء نظام حقول للنماذج

لنرَ كيف تعمل هذه الأنواع معًا في نظام نماذج حقيقي:

```typescript
// Base field wrapper using HTMLAttributes (no input-specific props needed)
interface FieldWrapperProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  error?: string;
  required?: boolean;
}

function FieldWrapper({ label, error, required, children, ...props }: FieldWrapperProps) {
  return (
    <div {...props} className={`field ${error ? 'field--error' : ''}`}>
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Input field using JSX.IntrinsicElements for precise typing
interface TextFieldProps extends JSX.IntrinsicElements['input'] {
  label: string;
  error?: string;
}

function TextField({ label, error, required, ...inputProps }: TextFieldProps) {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <input {...inputProps} className="field-input" />
    </FieldWrapper>
  );
}

// Select field with proper option typing
interface SelectFieldProps<T> extends Omit<JSX.IntrinsicElements['select'], 'value' | 'onChange'> {
  label: string;
  options: Array<{ value: T; label: string }>;
  value?: T;
  onChange?: (value: T) => void;
  error?: string;
}

function SelectField<T extends string | number>({
  label,
  options,
  value,
  onChange,
  error,
  required,
  ...selectProps
}: SelectFieldProps<T>) {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <select
        {...selectProps}
        value={value}
        onChange={(e) => onChange?.(e.target.value as T)}
        className="field-select"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
```

### اعتبارات الأداء وحجم الحزمة

هذه الأنواع المساعدة مجرّدات وقت التصريف (compile-time) بلا أي حمل على وقت التشغيل:

```typescript
// All of these compile to the same JavaScript
const props1: ComponentPropsWithoutRef<'button'> = { onClick: () => {} };
const props2: HTMLProps<HTMLButtonElement> = { onClick: () => {} };
const props3: JSX.IntrinsicElements['button'] = { onClick: () => {} };

// In JavaScript, they're all just: { onClick: () => {} }
```

الاختيار بينها يتعلق تجربة المطوّر وأمان الأنواع، لا الأداء.

## استراتيجية الترحيل

هل تنتقل من الخصائص اليدوية إلى `ComponentPropsWithoutRef`؟ إليك منهجًا آمنًا:

```typescript
// Step 1: Keep existing interface, extend ComponentPropsWithoutRef
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  // Keep your existing custom props
  variant?: 'primary' | 'secondary';
  // Remove native props you were manually defining
  // onClick?: () => void;  // ← Remove this, comes from ComponentPropsWithoutRef
  // disabled?: boolean;    // ← Remove this too
}

// Step 2: Update implementation to use rest props
function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} ${className || ''}`}
      {...props} // ← Now forwards all native props
    />
  );
}
```

هذا النهج متوافق مع الإصدارات السابقة ويمنحك فورًا الوصول إلى جميع الخصائص الأصلية.

## إلى الأمام

`ComponentPropsWithoutRef` هو الأساس لبناء مكوّنات متينة وقابلة لإعادة الاستخدام تبدو طبيعية الاستخدام. فهو يزيل الاحتكاك بين مكوّناتك المخصّصة وDOM الأصلي، ويمنح المطوّرين كامل قوة خصائص HTML مع فوائد منطقك المخصّص.

والأنماط التي غطّيناها — من الأغلفة البسيطة إلى المكوّنات متعددة الأشكال — تتوسّع من مكتبات مكوّنات من مكوّن واحد إلى أنظمة تصميم شاملة. تصبح مكوّناتك أكثر قوة ويصبح مطوّروك أكثر إنتاجية، ويبقى TypeScript في الوقت نفسه يراقب الجميع بصرامة بشأن الخصائص المتاحة فعلًا.

وتذكّر: الهدف ليس مجرّد إرضاء TypeScript، بل إنشاء مكوّنات تبدو امتدادات طبيعية لـ HTML. وحين تضبط هذا التوازن، يصبح بناء واجهات المستخدم متعةً لا عبئًا.

**التالي**: سنستكشف أنماط خصائص متقدّمة، بما في ذلك render props والمكوّنات المركّبة وتركيب معالِج الأحداث (event handlers) التي تعمل بسلاسة مع أساس خصائص DOM الذي أسّسناه هنا.

## زر مُنمَّط بـ `as` ومراجع آمنة

ابنِ زرًّا واحدًا `Button` يحاكي الخصائص الأصلية، ويدعم `as="a" | "button"`، ويمرّر المراجع بأنواع صحيحة.

```typescript
import { forwardRef } from 'react';

type ButtonAs = 'button' | 'a';

type ButtonCommonProps = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
};

type ButtonAsButton = {
  as?: 'button';
} & JSX.IntrinsicElements['button'];

type ButtonAsLink = {
  as: 'a';
} & JSX.IntrinsicElements['a'];

type ButtonProps = ButtonCommonProps & (ButtonAsButton | ButtonAsLink);

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'primary',
    children,
    as = 'button',
    ...rest
  } = props as ButtonProps & {
    as: ButtonAs;
  };

  const className = `btn btn-${variant} ${(rest as any).className ?? ''}`.trim();

  if (as === 'a') {
    const linkProps = rest as JSX.IntrinsicElements['a'];
    return (
      <a ref={ref as React.ForwardedRef<HTMLAnchorElement>} {...linkProps} className={className}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as JSX.IntrinsicElements['button'];
  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      {...buttonProps}
      className={className}
    >
      {children}
    </button>
  );
});
```

- يحاكي الخصائص الأصلية عبر `JSX.IntrinsicElements` فتتحصل على خصائص وأحداث دقيقة.
- يقيّد `as` بالقيمة `'a' | 'button'` لتجنّب التركيبات المفاجئة.
- يمرّر المراجع بنوع العنصر الأساسي الصحيح.
