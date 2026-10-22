---
title: "الانتقال من PropTypes إلى TypeScript"
---

كانت `PropTypes` في React رائعة في زمنها — فقد وفّرت لنا التحقق من الخصائص في وقت التشغيل حين لم يكن لدى JavaScript الكثير مما يُذكر من التحليل الساكن. لكن الآن، بعد أن أصبح TypeScript المعيار الفعلي لتطوير React، يمكنك الحصول على أمان أنواع أفضل وكشف مبكر للأخطاء وتجربة مطور متفوقة بالانتقال من `PropTypes` إلى واجهات وأنواع TypeScript.

هذا الترحيل ليس مجرد مسألة إزالة اعتمادية (وإن كان ذلك جميلاً). إنه نقل التحقق من وقت التشغيل إلى وقت التجميع، حيث يمكنك اكتشاف المشكلات قبل وصولها إلى المستخدمين. فيتحسن محررك، ويصبح بناؤك أسرع، وتصبح خصائصك ذاتية التوثيق.

## لماذا تجري هذا التحويل؟

قبل أن نتعمق في التفاصيل، دعونا نستعرض سريعاً لماذا يستحق هذا الترحيل وقتك:

- **التحقق في وقت التجميع مقابل وقت التشغيل**: لا تكتشف `PropTypes` الأخطاء إلا عندما يُصيَّر مكوّنك فعلياً بخصائص غير صالحة. أما TypeScript فيكشف هذه المشكلات أثناء التطوير، داخل محررك، قبل أن تشغّل شفرتك أصلاً.
- **تجربة مطور أفضل**: يستطيع محررك إكمال الخصائص تلقائياً، وإخبارك بما هو متوقع، وتسطير المشكلات في الوقت الفعلي. لا مزيد من البحث في تحذيرات وحدة التحكم.
- **فوائد الأداء**: تضيف `PropTypes` عبئاً في وقت التشغيل، خاصة في وضع التطوير حيث تكون أكثر نشاطاً. أما التحقق بـ TypeScript فيحدث في وقت التجميع بلا أي تكلفة على وقت التشغيل.
- **شيفرة ذاتية التوثيق**: تعمل واجهات TypeScript بوصفها تحققاً وتوثيقاً معاً، مما يجعل واجهات مكوّناتك أوضح للمطورين الآخرين (بما فيهم أنت في المستقبل).

## التحويل الأساسي

لنبدأ بمثال بسيط. إليك مكوّن يستخدم PropTypes:

```typescript
// ❌ Old `PropTypes` approach
import React from 'react';
import `PropTypes` from 'prop-types';

const UserCard = ({ name, email, age, isActive }) => {
  return (
    <div className={`user-card ${isActive ? 'active' : ''}`}>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>Age: {age}</span>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.bool,
};

UserCard.defaultProps = {
  age: 0,
  isActive: false,
};
```

وإليك النسخة المكافئة في TypeScript:

```typescript
// ✅ TypeScript approach
import React from 'react';

interface UserCardProps {
  name: string;
  email: string;
  age?: number;
  isActive?: boolean;
}

const UserCard = ({ name, email, age = 0, isActive = false }: UserCardProps) => {
  return (
    <div className={`user-card ${isActive ? 'active' : ''}`}>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>Age: {age}</span>
    </div>
  );
};
```

لاحظ كم أصبح هذا أنظف؟ لقد أزلنا تعريف `PropTypes` المنفصل ونقلنا القيم الافتراضية مباشرة إلى تفكيك المعاملات (parameter destructuring). وتشير صيغة `?` إلى خصائص اختيارية، مما يجعل الواجهة أوضح للقراءة مما كانت عليه `PropTypes` يوماً.

## التعامل مع الأنواع المعقّدة

كانت لدى PropTypes بعض القيود عندما يتعلق الأمر ببنى البيانات المعقّدة. وهنا يتألق TypeScript:

```typescript
// ❌ `PropTypes` approach - limited expressiveness
const ProductList = ({ products, onProductClick, filters }) => {
  // Component implementation...
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string,
    }),
  ).isRequired,
  onProductClick: PropTypes.func.isRequired,
  filters: PropTypes.object, // 😬 Not very specific
};
```

```typescript
// ✅ TypeScript approach - precise and expressive
interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
}

interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  inStock?: boolean;
}

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  filters?: ProductFilters;
}

const ProductList = ({ products, onProductClick, filters = {} }: ProductListProps) => {
  // Component implementation...
};
```

انظر إلى نوع `onProductClick` هذا! مع PropTypes، كنا نتحقق فقط من كونه دالة. أما TypeScript فيخبرنا بدقة بالمعاملات التي يتوقعها وما يعيده. ويمكن لمحررك الآن إكمال المعامل `product` تلقائياً أثناء تنفيذك لمعالج النقر.

## ترحيل الأنواع الاتحادية والتعدادات

كان لدى PropTypes التابع `PropTypes.oneOf()` لمجموعات القيم المقيَّدة. أما الأنواع الاتحادية (union types) في TypeScript فهي أكثر قوة:

```typescript
// ❌ `PropTypes` approach
const Button = ({ variant, size, disabled, onClick, children }) => {
  // Implementation...
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
```

```typescript
// ✅ TypeScript approach with union types
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  // Implementation...
};
```

نصيحة المحترفين: عرّف أنواعك الاتحادية بشكل منفصل حتى تتمكن من إعادة استخدامها عبر المكوّنات. فإذا كان لديك عدة مكوّنات شبيهة بالأزرار، يمكنها جميعاً مشاركة النوع `ButtonVariant` نفسه.

## التعامل مع المكوّنات متعددة الأشكال

من المجالات التي عانت فيها `PropTypes` فعلاً المكوّنات متعددة الأشكال — أي المكوّنات التي يمكن أن تُصيَّر بوصفها عناصر HTML مختلفة. ويتعامل TypeScript مع هذا بأناقة:

```typescript
// ✅ Polymorphic component with TypeScript
interface HeadingProps<T extends React.ElementType = 'h1'> {
  as?: T;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const Heading = <T extends React.ElementType = 'h1'>({
  as,
  level = 1,
  children,
  ...props
}: HeadingProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof HeadingProps>) => {
  const Component = as || (`h${level}` as React.ElementType);

  return <Component {...props}>{children}</Component>;
};

// Usage - TypeScript knows about div-specific props!
<Heading as="div" className="custom-heading" onClick={handleClick}>
  This is a heading
</Heading>;
```

قد يبدو هذا معقّداً، لكنه يمنحك أمان أنواع مذهلاً. فعندما تستخدم `as="div"`، يعرف TypeScript أنك تستطيع استخدام `onClick` و`className` وغيرها من الخصائص الخاصة بـ div. أما مع PropTypes، فكان هذا النوع من التعريف بالأنواع بشكل شرطي مستحيلاً.

## استراتيجية الترحيل

لا تحاول ترحيل كل شيء دفعة واحدة. إليك نهجاً عملياً:

### الخطوة 1: ابدأ بالمكوّنات الورقية

ابدأ بالمكوّنات التي ليس لديها مكوّنات أبناء. وهي عادةً أسهل في الترحيل وتساعدك على بناء الثقة:

```typescript
// Start here - simple, no dependencies on other components
const LoadingSpinner = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  return <div className={`spinner spinner--${size}`} />;
};
```

### الخطوة 2: أنشئ أنواعاً مشتركة

مع تقدّمك في الترحيل، ستلاحظ أنماطاً متكررة. استخرج الأنواع المشتركة:

```typescript
// types/common.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiError {
  message: string;
  code: number;
  details?: Record<string, unknown>;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

### الخطوة 3: رحّل المكوّنات الآباء

بمجرد أن تصبح مكوّناتك الورقية معرّفة بالأنواع، اصعد في شجرة المكوّنات. وسيساعدك مترجم TypeScript على اكتشاف أي تناقضات.

### الخطوة 4: أزل `PropTypes`

احذف PropTypes الخاص بمكوّن بعد اكتمال ترحيله بالكامل فقط. هكذا تتأكد من أن أنواع TypeScript تعمل بشكل صحيح قبل أن تفقد شبكة الأمان التي يوفرها التحقق في وقت التشغيل.

```bash
# Remove `PropTypes` dependency when you're done
npm uninstall prop-types
# or
yarn remove prop-types
```

## فخاخ شائعة وحلولها

### خصائص الأبناء

استخدمت PropTypes التابع `PropTypes.node` لأي شيء يمكن تصييره. أما TypeScript فهو أكثر تحديداً:

```typescript
// ❌ Too restrictive
interface Props {
  children: JSX.Element; // Only accepts single React elements
}

// ✅ Flexible like PropTypes.node
interface Props {
  children: React.ReactNode; // Accepts strings, numbers, elements, arrays, etc.
}

// ✅ Even more specific when you know what you expect
interface Props {
  children: string; // Only accepts strings
}
```

### تمرير المراجع

إذا كنت تستخدم `React.forwardRef`، فالتعريف بالأنواع مختلف قليلاً:

```typescript
// ✅ Proper ref forwarding with TypeScript
interface InputProps {
  placeholder?: string;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, disabled, ...props }, ref) => {
    return <input ref={ref} placeholder={placeholder} disabled={disabled} {...props} />;
  },
);

Input.displayName = 'Input';
```

### معالجات الأحداث

لم تكن PropTypes قادرة على إخبارك الكثير عن معالجات الأحداث. أما TypeScript فيمكنه أن يكون محدداً جداً:

```typescript
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}
```

سيتكفل محررك الآن بإكمال `event.target` و`event.preventDefault()` تلقائياً، وإخبارك بدقة بالخصائص المتاحة.

## التحقق من الخصائص في وقت التشغيل

قد تسأل: «لكن، ماذا عن التحقق في وقت التشغيل؟ ماذا لو عادت واجهة الـ API بالبيانات تالفة؟»

سؤال ممتاز! يتولى TypeScript التحقق في وقت التجميع، لكنك ما زلت بحاجة إلى التحقق في وقت التشغيل للبيانات الخارجية. وهنا تفيدك مكتبات مثل [Zod](https://github.com/colinhacks/zod):

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

type User = z.infer<typeof UserSchema>;

// Validate API responses
const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();

  // This will throw if the data doesn't match our schema
  return UserSchema.parse(data);
};
```

هذا يمنحك أفضل ما في العالمين: أمان وقت التجميع من TypeScript، والتحقق في وقت التشغيل حيث تحتاجه فعلاً (عند حدود تطبيقك).

## اعتبارات الأداء

من أولى الفوائد التي ستلاحظها بعد إزالة `PropTypes` هي بناء أسرع في وضع التطوير وأحجام حِزم أصغر. فشيفرة التحقق في `PropTypes` تُستبعد من بناء الإنتاج، لكنها ما زالت بحاجة إلى معالجة أثناء التطوير.

إليك ما سنتخلص منه:

```typescript
// This entire block disappears
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.bool,
};
```

وفي التطبيقات الكبيرة ذات المكوّنات العديدة، يمكن أن يترجم هذا إلى انخفاض معتبر في حجم الحزمة (bundle) واستبدال أسرع للوحدات (hot module replacement) أثناء التطوير.

## متى قد تحتفظ بـ `PropTypes`

هناك بضعة سيناريوهات قد ترغب فيها مؤقتاً بالاحتفاظ بـ `PropTypes`:

- **التكامل مع جهات خارجية**: إذا كنت تبني مكوّنات سيستهلكها مشاريع JavaScript (غير TypeScript)، يمكن لـ `PropTypes` توفير أمان في وقت التشغيل لهؤلاء المستهلكين.
- **الترحيل التدريجي**: خلال ترحيل كبير، يمكن للوجود المتزامن لأنواع TypeScript و`PropTypes` أن يوفر أماناً مكرراً أثناء بناء ثقتك بأنواعك الجديدة.
- **التهيئة في وقت التشغيل**: إذا كانت مكوّناتك تستقبل خصائصها من ملفات تهيئة أو أنظمة خارجية في وقت التشغيل، يمكن لـ `PropTypes` اكتشاف سوء التهيئة الذي لا يراه TypeScript.

لكن تندر تواجد هذه السيناريوهات في معظم تطبيقات React، وتفوق فوائد TypeScript الخالص كثيراً فائدة الاحتفاظ بـ `PropTypes`.

## الخلاصة

الترحيل من `PropTypes` إلى TypeScript ليس مجرد اتباع للاتجاهات — إنه تحسين جوهري لطريقة بنائك لتطبيقات React. ستحصل على كشف مبكر للأخطاء، ودعم أفضل من أدوات التطوير، وشيفرة ذاتية التوثيق، وأداء متحسّن.

قد يبدو الترحيل عملاً إضافياً في البداية، لكن كل مكوّن تحوّله يصبح أكثر متانة وأسهل صيانة وأكثر سروراً بالعمل. وسيشكرك نسختك المستقبلية (وزملاؤك في الفريق) على هذا الاستثمار.

ابدأ صغيراً، ورحّل مكوّناً بعد مكوّن، وقبل أن تنتبه ستكون لديك تطبيقات React معرفة بالأنواع بالكامل، أكثر موثوقية وأسهل في التطوير من أي وقت مضى.
