---
title: "المكوّنات متعددة الأشكال وخاصية as"
---

هل تمنيت يومًا أن تبني مكوّن `Button` يمكن أن يُصيَّر كعنصر `button` أو كوسم `a` أو حتى كمكوّن React مخصّص — ومع ذلك تحصل على إكمال تلقائي (intellisense) صحيح من TypeScript للعنصر الذي يُصيَّر فعلًا؟ أهلًا بك في المكوّنات متعددة الأشكال (polymorphic components)، حيث نبدل قدرًا من تعقيد الأنواع بقدر كبير من قابلية إعادة الاستخدام. وفي نهاية هذا الدرس ستفهم كيف تبني مكوّنات تتكيّف مخرجاتها من HTML وأنواعها في TypeScript بحسب خاصية `as`، كل ذلك دون أن تلجأ إلى `any` أو تخدع مدقّق الأنواع.

التحدّي بسيط: تريد مكوّنًا واحدًا يتولّى منطق التنسيق والسلوك، لكنك تحتاجه ليُصيّر عناصر HTML مختلفة حسب السياق. زرٌّ يكون أحيانًا `<button>` وأحيانًا `<a href="...">` وأحيانًا مكوّن `Link` المخصّص من مكتبة الموجّه لديك.

## المشكلة مع الأساليب التقليدية

لنبدأ بما لا يعمل. قد تغريك وتجربة شيء كالتالي:

```typescript
// ❌ Don't do this
interface BadButtonProps {
  as?: string | React.ComponentType<any>; // Ugh, `any`
  children: React.ReactNode;
  onClick?: () => void;
  href?: string; // What if we're rendering a button?
  to?: string; // What if we're not using React Router?
  [key: string]: any; // More `any` sadness
}

const BadButton = ({ as: Component = 'button', children, ...props }: BadButtonProps) => {
  return <Component {...props}>{children}</Component>;
};
```

هذا يعمل أثناء التشغيل، لكن TypeScript لا يدري ما يحدث. تفقد كل مزايا التحقق من الأنواع — لا إكمال تلقائي للخصائص الصحيحة، ولا تحذيرات من تركيبات الخصائص غير الصالحة، ولا شبكة أمان حين تعيد الهيكلة.

## بناء مكوّن متعدد الأشكال بشكل صحيح

إليك كيف نحلّ هذا بشكل صحيح. سنبني مكوّن `Button` يستطيع التصيير كأي عنصر HTML أو مكوّن React مع الحفاظ على أمان الأنواع كاملًا:

```typescript
import { ComponentPropsWithoutRef, ElementType } from 'react';

// First, let's define our base props that every Button should have
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Now for the magic: a polymorphic prop type that merges our base props
// with the props of whatever element we're rendering as
type PolymorphicButtonProps<T extends ElementType> = BaseButtonProps & {
  as?: T;
} & ComponentPropsWithoutRef<T>;

// The component itself, using a generic to preserve the element type
const Button = <T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: PolymorphicButtonProps<T>) => {
  const Component = as || 'button';

  // Your styling logic goes here
  const baseClasses = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const className = [baseClasses, variantClasses[variant], sizeClasses[size]].join(' ');

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

export default Button;
```

لنحلّل ما يحدث هنا:

1. **`BaseButtonProps`**: هذه هي الخصائص التي ينبغي أن يملكها كل زر، بغضّ النظر عن العنصر الذي يُصيَّر
2. **`PolymorphicButtonProps<T>`**: هنا يحدث السحر — ندمج خصائصنا الأساسية مع خصائص العنصر الذي يمثّله النوع `T`
3. **`ComponentPropsWithoutRef<T>`**: هذا يعطينا كل الخصائص القياسية للعنصر `T` (مثل `href` للروابط و`onClick` للأزرار)
4. **القيد العام `<T extends ElementType>`**: يضمن ألا يكون `T` إلا شيئًا يستطيع React تصييره فعلًا

## استخدام زرّك متعدد الأشكال

الآن يمكنك استخدام مكوّن الزر متعدد الأشكال بطرق لا حصر لها، وسيلزمك TypeScript أن تلتزم الصواب:

```typescript
// ✅ Renders a <button> with onClick
<Button onClick={() => console.log('clicked')}>
  Default Button
</Button>

// ✅ Renders an <a> with href - TypeScript knows href is valid here
<Button as="a" href="https://example.com" target="_blank">
  Link Button
</Button>

// ✅ Renders a Next.js Link component
import Link from 'next/link';
<Button as={Link} href="/dashboard">
  Next.js Link
</Button>

// ✅ All your custom props work too
<Button variant="danger" size="lg" onClick={handleDelete}>
  Delete Account
</Button>

// ❌ TypeScript will complain - buttons don't have href
<Button href="/somewhere">Won't compile</Button>

// ❌ TypeScript will also complain - anchors need href
<Button as="a">Missing href</Button>
```

> **نصيحة**
>
> لاحظ كيف يوفّر TypeScript تلقائيًا اقتراحات الإكمال التلقائي المناسبة بحسب خاصية `as`. حين تستخدم `as="a"` تحصل على `href` و`target` و`download` وغيرها. وحين تستخدم الزر الافتراضي تحصل على `onClick` و`disabled` و`type` وغيرها.

## أنماط متقدمة متعددة الأشكال

### التعامل مع تمرير الـ ref

إن كنت بحاجة إلى تمرير الـ ref (وهو غالبًا ما ستحتاج إليه)، فإليك كيف تضيفه دون أن تكسر تعدّد الأشكال:

```typescript
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';

type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];

type PolymorphicButtonProps<T extends ElementType> = BaseButtonProps & {
  as?: T;
} & ComponentPropsWithoutRef<T>;

type ButtonComponent = <T extends ElementType = 'button'>(
  props: PolymorphicButtonProps<T> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;

const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    { as, variant = 'primary', size = 'md', children, ...props }: PolymorphicButtonProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = as || 'button';

    // ... same styling logic as before

    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';
```

> **ملاحظة**
>
> يصبح ضبط أنواع الـ ref معقّدًا بعض الشيء، لكنه يستحق ذلك مقابل تجربة تعدّد الأشكال الكاملة. إذ ستصبح مراجعك (refs) مضبوطة بشكل صحيح بحسب العنصر الذي تُصيّره فعلًا.

### إنشاء نوع متعدد الأشكال قابل لإعادة الاستخدام

إن كنت تبني عدة مكوّنات متعددة الأشكال (وهو ما ينبغي أن تفعله)، فاستخرج النمط في نوع قابل لإعادة الاستخدام:

```typescript
type PolymorphicComponentProps<T extends ElementType, Props = {}> = Props & {
  as?: T;
} & ComponentPropsWithoutRef<T>;

type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];

type PolymorphicComponent<DefaultElement extends ElementType, Props = {}> = <
  T extends ElementType = DefaultElement,
>(
  props: PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;
```

الآن يمكنك بناء مكوّنات متعددة الأشكال بمقدار أقل من الكود المتكرّر:

```typescript
interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
}

const Card: PolymorphicComponent<'div', CardProps> = forwardRef(
  ({ as, padding = 'md', shadow = true, children, ...props }, ref) => {
    const Component = as || 'div';

    // Your card styling logic here

    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);
```

## نمط «asChild»

تعرض بعض أنظمة التصميم خاصية `asChild` لتصيير أي عنصر فرعي تمرّره مع الحفاظ على تنسيق وسلوك المكوّن. وهذا يبقي دلالات DOM تحت سيطرتك (استخدم `Link` أو `button` أو أي عنصر) دون التضحية بكتابة الأنواع.

```typescript
import { forwardRef, cloneElement, isValidElement } from 'react';

type AsChildProps = {
  asChild?: boolean;
  children: React.ReactElement;
};

type BaseButtonProps = {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
} & AsChildProps;

const cx = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(' ');

export const Button = forwardRef<HTMLElement, BaseButtonProps>(
  ({ asChild, children, variant = 'primary', disabled, ...rest }, ref) => {
    const className = cx('btn', `btn-${variant}`, disabled && 'btn-disabled');

    if (asChild) {
      // Render the passed child, merging props and ref
      if (isValidElement(children)) {
        return cloneElement(children as React.ReactElement, {
          className: cx((children.props as any).className, className),
          ref,
          ...rest,
        });
      }
      return null;
    }

    return (
      <button className={className} disabled={disabled} ref={ref as any} {...rest}>
        {children}
      </button>
    );
  },
);
```

- استخدم `asChild` حين تحتاج إلى التحكم في العنصر المُصيَّر (مثل `Link` في Next.js أو روابط Reach Router) مع الرغبة في الإبقاء على تنسيق وسلوك الزر.
- يصبح نوع الـ ref أكثر مرونة قليلًا (يمكن استخدام الأنواع العامة مع حرّاس العناصر)؛ وفي معظم الحالات، يعمل التمرير بوصفه `HTMLElement` جيدًا مع عناصر DOM.

## حالات الاستخدام في العالم الحقيقي™

### مكوّنات نظام التصميم

تتألق المكوّنات متعددة الأشكال في أنظمة التصميم حيث تحتاج إلى تنسيق متّسق عبر العناصر الدلالية المختلفة:

```typescript
// Your design system's Text component
interface TextProps {
  variant?: 'body' | 'caption' | 'heading';
  weight?: 'normal' | 'medium' | 'bold';
}

const Text: PolymorphicComponent<'span', TextProps> = /* ... */;

// Usage across your app
<Text as="h1" variant="heading" weight="bold">Page Title</Text>
<Text as="p" variant="body">Regular paragraph text</Text>
<Text as="label" variant="caption" weight="medium">Form label</Text>
```

### التكامل مع الموجّه

مثالية للتكامل مع مكتبات الموجّه المختلفة:

```typescript
// Works with React Router
<Button as={NavLink} to="/profile" variant="secondary">
  Profile
</Button>

// Works with Next.js
<Button as={Link} href="/profile" variant="secondary">
  Profile
</Button>

// Works with Gatsby
<Button as={GatsbyLink} to="/profile" variant="secondary">
  Profile
</Button>
```

## اعتبارات الأداء

المكوّنات متعددة الأشكال هي في جوهرها تجريدات بلا تكلفة وقت التشغيل — إذ تختفي الأنواع العامة بعد الترجمة (compilation)، وأنت لا تسلّم سوى خصائص إلى عناصر React اعتيادية. واعتبار الأداء الرئيسي هو نفسه لأي مكوّن React: تجنّب إعادة إنشاء المكوّن في كل تصيير إن كنت تمرّره مضمّنًا.

```typescript
// ✅ Good - component reference is stable
const LinkComponent = Link;
<Button as={LinkComponent} href="/dashboard">Dashboard</Button>

// ❌ Potentially problematic - creates new component reference each render
<Button as={React.forwardRef((props, ref) => <Link ref={ref} {...props} />)}>
  Dashboard
</Button>
```

## الأخطاء الشائعة وكيف تتجنّبها

### لغز `displayName`

اضبط `displayName` دائمًا على مكوّناتك متعددة الأشكال، ولا سيما عند استخدام `forwardRef`. وستشكلك أدوات مطوّري React على ذلك:

```typescript
const Button: PolymorphicComponent<'button', ButtonProps> = forwardRef(/* ... */);
Button.displayName = 'Button'; // ✅ Good
```

### تعارضات الخصائص

أحيانًا قد تتعارض خصائصك الأساسية مع سمات HTML. تعامل مع هذا الأمر صراحةً:

```typescript
interface BaseProps {
  size?: string; // Conflicts with HTML img size attribute
}

// If rendering as img, prefer HTML size over your custom size
const Component = ({ size, ...props }: PolymorphicComponentProps<T, BaseProps>) => {
  const { size: _, ...cleanProps } = props; // Remove conflicting props
  // Handle the conflict appropriately
};
```

### أداء TypeScript

أنواع متعددة الأشكال شديدة التعقيد قد تُبطئ مُجمِّع TypeScript. فإن لاحظت تباطؤًا، فكّر في تبسيط أنواعك أو تقسيم المكوّنات المعقّدة إلى مكوّنات أصغر محدّدة الغرض.

## الخطوات التالية

الآن بين يديك الأدوات لبناء مكوّنات قابلة لإعادة الاستخدام حقًا دون التضحية بأمان الأنواع مقابل المرونة. ابدأ بمكوّن زرّ أو نصّ بسيط، واطمئن إلى الأنماط، ثم وسّع إلى حالات استخدام أكثر تعقيدًا.

فكّر في بناء نسخ متعددة الأشكال من المكوّنات الشائعة مثل:

- `Box` (`div` افتراضيًا، لكنه قد يكون أي حاوية)
- `Heading` (`h2` افتراضيًا، لكنه قد يكون من `h1` إلى `h6`)
- `List` (`ul` افتراضيًا، لكنه قد يكون `ol` أو `div`)

لقد أصبح نمط خاصية `as` شائعًا أكثر فأكثر في مكتبات React الحديثة (Chakra UI وMantine وStitches) لأنه يحلّ مشكلات حقيقية دون المساس بتجربة المطوّر. وما إن تبدأ باستخدام المكوّنات متعددة الأشكال حتى تتساءل كيف كنت تبني واجهات قابلة لإعادة الاستخدام من دونها.
