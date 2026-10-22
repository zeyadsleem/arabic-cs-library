---
title: "النماذج والأحداث وحقول الأرقام"
---

ينبغي أن يكون بناء النماذج في React باستخدام TypeScript أمرًا مباشرًا — حدّد حالتك، وتعامل مع الأحداث، وصيّر حقول الإدخال. لكنك تصطدم بالمزالق الكلاسيكية: أنواع أحداث لا معنى لها، و`<input type="number">` الذي يعيد سلاسل نصية على أي حال، ومعالِجات نماذج تحتاج إلى نفس الشيفرة المتكرّرة في كل مكان. لنُصلح كل ذلك بأنماط متينة تجعل نماذجك آمنة الأنواع وممتعة في العمل فعلًا.

## المشكلة مع أنواع الأحداث

قد يبدو نظام أحداث React كمتاهة من الأنواع العامة. تبدأ بمعالِج بسيط لحقل إدخال، فتتلقّى فورًا أخطاء TypeScript التي تدفعك للتساؤل عن قراراتك في الحياة:

```typescript
// ❌ What type is this supposed to be?
const handleChange = (e) => {
  setEmail(e.target.value);
};
```

يخبرك المصرّف بكل لطف بأن `Parameter 'e' implicitly has an 'any' type`، وهو أمر عديم الفائدة كنسبة الشوكولاتة في إبريق الشاي. لنُصلح ذلك نهائيًا.

## معالِج أحداث عامة تعمل فعلًا

إليك النمط الذي أستخدمه في 90% من حقول النماذج — معالِج عام يستنتج الأنواع الصحيحة:

```typescript
import { ChangeEvent } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
  });

  // ✅ One handler to rule them all
  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <input name="name" value={formData.name} onChange={handleInputChange} />
      <input name="email" type="email" value={formData.email} onChange={handleInputChange} />
      <textarea name="message" value={formData.message} onChange={handleInputChange} />
    </form>
  );
}
```

يناسب هذا النهج العام حقول الإدخال ومناطق النص وعناصر الاختيار. يضمن القيد `T extends HTMLInputElement | HTMLTextAreaElement` أن يعرف TypeScript ما الخصائص المتاحة على `e.target`.

## خدعة حقول الأرقام الكبرى

هنا تصبح الأمور شهيرة. تظن أن `<input type="number">` سيعطيك أرقامًا، أليس كذلك؟ خطأ! إنه يعطيك سلاسل نصية تبدو كأرقام، لأن عناصر التحكم في نماذج HTML تعيد قيمًا نصية دائمًا عبر واجهة DOM.

```typescript
// ❌ This will bite you eventually
const [age, setAge] = useState<number>(0);

const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
  setAge(e.target.value); // Type error: string is not assignable to number
};
```

أمامك بعض الخيارات، وجميعها تتطلّب أن تكون صريحًا بشأن عملية التحويل:

### الخيار 1: التحويل على مستوى المعالِج

```typescript
const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value === '' ? 0 : Number(e.target.value);
  setAge(value);
};
```

### الخيار 2: معالِج أرقام عام مع تحقّق

هذا هو نهجي المفضّل — معالِج قابل لإعادة الاستخدام يحوّل السلاسل إلى أرقام بأمان:

```typescript
const handleNumericInput = (e: ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
  const { value } = e.target;

  // Handle empty string case
  if (value === '') {
    setter(0);
    return;
  }

  // Convert and validate
  const numValue = Number(value);
  if (!isNaN(numValue)) {
    setter(numValue);
  }
  // If NaN, ignore the input (keeps current state)
};

// Usage:
<input type="number" value={age} onChange={(e) => handleNumericInput(e, setAge)} />;
```

### الخيار 3: خُطّاف مخصّص لحقول الأرقام

في «حالات الاستخدام من العالم الحقيقي™»، أغلّف هذا المنطق عادةً في خُطّاف مخصّص:

```typescript
function useNumberInput(initialValue: number = 0) {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setValue(0);
      return;
    }

    const numValue = Number(inputValue);
    if (!isNaN(numValue)) {
      setValue(numValue);
    }
  };

  return {
    value,
    onChange: handleChange,
    // Convenience setter if you need it
    setValue,
  };
}

// Usage becomes beautifully simple:
function PriceInput() {
  const price = useNumberInput(0);

  return <input type="number" min="0" step="0.01" {...price} />;
}
```

## إرسال النماذج دون المزالق

إرسال النماذج هو مجال آخر يمكن فيه لـ TypeScript منع أخطاء وقت التشغيل. ستحتاج إلى التحقّق من بيانات نموذجك قبل الإرسال — وهنا يصبح التحقّق وقت التشغيل أمرًا جوهريًا.

للاطلاع على تغطية شاملة للتحقّق وقت التشغيل باستخدام Zod بما في ذلك أنماط تحقّق النماذج، راجع [جلب البيانات والتحقّق وقت التشغيل](https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation).

وهنا منهج بسيط يبدأ من TypeScript لإرسال النماذج الأساسي:

```typescript
import { FormEvent } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  age: number;
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    age: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    const fieldErrors: Record<string, string> = {};
    if (!formData.name) fieldErrors.name = 'Name is required';
    if (!formData.email.includes('@')) fieldErrors.email = 'Invalid email';
    if (formData.age < 0 || formData.age > 120) fieldErrors.age = 'Invalid age';

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    submitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your inputs here */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

> **نصيحة**
>
> في تطبيقات الإنتاج، استخدم مكتبة تحقّق بمخطّطات مثل Zod لضمان أمان الأنواع وقت التشغيل ورسائل خطأ متّسقة. راجع [جلب البيانات والتحقّق وقت التشغيل](https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation) أمثلة كاملة.

## المُتحكَّم به مقابل غير المُتحكَّم به: اختر سمّك

توفّر React لك طريقتين للتعامل مع حقول النماذج، ولكل منهما مكانها:

### المكوّنات المُتحكَّم بها (الأكثر شيوعًا)

```typescript
function ControlledForm() {
  const [email, setEmail] = useState('');

  return <input value={email} onChange={(e) => setEmail(e.target.value)} />;
}
```

**الإيجابيات**: تحكّم كامل من React، وتحقّق سهل، وحالة يمكن التنبؤ بها **السلبيات**: إعادة تصيير عند كل ضغطة مفتاح، وطول أكبر للنماذج البسيطة

### المكوّنات غير المُتحكَّم بها (أحيانًا أفضل)

```typescript
import { useRef, FormEvent } from 'react';

function UncontrolledForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    // Do something with email
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" />
    </form>
  );
}
```

**الإيجابيات**: إعادة تصيير أقل، وبساطة أكبر للنماذج الأساسية، وتوافق جيد مع مكتبات النماذج **السلبيات**: صعوبة أكبر في التحقّق الفوري، وأقل «بطابع React»

في معظم الحالات ألتزم بالمكوّنات المُتحكَّم بها. لكن إن كان لديك نموذج كبير يهمّ فيه الأداء، فإن المكوّنات غير المُتحكَّم بها مع مكتبة مثل [React Hook Form](https://react-hook-form.com/) قد تُحدث فارقًا كبيرًا.

## متقدّم: باني نماذج آمن الأنواع

للاطلاع على منهج أكثر متانة مع التحقّق وقت التشغيل، راجع أمثلة Zod في [جلب البيانات والتحقّق وقت التشغيل](https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation). وإليك نمطًا يركّز على TypeScript وينشئ بانيات نماذج آمنة الأنواع:

```typescript
type FormFieldConfig<T> = {
  [K in keyof T]: {
    type: 'text' | 'email' | 'number' | 'textarea';
    label: string;
    validation?: (value: T[K]) => string | null;
  };
};

function createFormBuilder<T extends Record<string, any>>(
  initialData: T,
  fieldConfig: FormFieldConfig<T>,
) {
  return function FormBuilder({ onSubmit }: { onSubmit: (data: T) => void }) {
    const [data, setData] = useState<T>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const updateField = <K extends keyof T>(field: K, value: T[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      const newErrors: Partial<Record<keyof T, string>> = {};
      let hasErrors = false;

      // Run validations
      (Object.keys(fieldConfig) as Array<keyof T>).forEach((field) => {
        const config = fieldConfig[field];
        if (config.validation) {
          const error = config.validation(data[field]);
          if (error) {
            newErrors[field] = error;
            hasErrors = true;
          }
        }
      });

      if (hasErrors) {
        setErrors(newErrors);
        return;
      }

      onSubmit(data);
    };

    return (
      <form onSubmit={handleSubmit}>
        {(Object.keys(fieldConfig) as Array<keyof T>).map((field) => {
          const config = fieldConfig[field];
          const error = errors[field];

          if (config.type === 'textarea') {
            return (
              <div key={String(field)}>
                <label>{config.label}</label>
                <textarea
                  value={String(data[field])}
                  onChange={(e) => updateField(field, e.target.value as T[typeof field])}
                />
                {error && <span style={{ color: 'red' }}>{error}</span>}
              </div>
            );
          }

          return (
            <div key={String(field)}>
              <label>{config.label}</label>
              <input
                type={config.type}
                value={String(data[field])}
                onChange={(e) => {
                  const value =
                    config.type === 'number'
                      ? (Number(e.target.value) as T[typeof field])
                      : (e.target.value as T[typeof field]);
                  updateField(field, value);
                }}
              />
              {error && <span style={{ color: 'red' }}>{error}</span>}
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    );
  };
}

// Usage:
const UserFormBuilder = createFormBuilder(
  { name: '', email: '', age: 0 },
  {
    name: {
      type: 'text',
      label: 'Full Name',
      validation: (value) => (value.length < 1 ? 'Name is required' : null),
    },
    email: {
      type: 'email',
      label: 'Email Address',
      validation: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email'),
    },
    age: {
      type: 'number',
      label: 'Age',
      validation: (value) => (value < 0 || value > 120 ? 'Invalid age' : null),
    },
  },
);
```

يمنحك هذا النمط أمان الأنواع، وتحقّقًا قابلًا لإعادة الاستخدام، ومعالجة متّسقة للخطأ عبر النماذج. وهو بالتأكيد أعقد مما تحتاجه في الحالات البسيطة، لكنه يتوسّع جيدًا حين يكون لديك عشرات النماذج لبنائها.

## المزالق الشائعة وكيف تتجنّبها

### محاربة واجهة DOM

تذكّر: حقول إدخال HTML تعيد سلاسل نصية دائمًا. لا تحاربها، بل حوّلها:

```typescript
// ❌ Trying to force the DOM to be different than it is
const age: number = e.target.value; // Type error

// ✅ Accept reality and convert safely
const age: number = Number(e.target.value) || 0;
```

### أنواع أحداث معقّدة أكثر من اللازم

لست بحاجة إلى حفظ كل نوع من أنواع أحداث React. ابدأ ببساطة:

```typescript
// ✅ This covers 90% of cases
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  // ...
};
```

### إهمال الحالات الحدّية

السلاسل الفارغة وقيم NaN والمراجع الفارغة هي واقع — تعامل معها:

```typescript
// ✅ Defensive programming
const value = inputRef.current?.value || '';
const numValue = value === '' ? 0 : Number(value);
if (!isNaN(numValue)) {
  setValue(numValue);
}
```

## اعتبارات الأداء

يمكن لحقول النماذج أن تسبّب إعادة تصيير كثيرة، ولا سيما في المكوّنات المُتحكَّم بها. إليك بعض الاستراتيجيات لإبقاء الأمور سريعة:

### تأجيل العمليات المكلفة

```typescript
import { useMemo } from 'react';

function SearchForm() {
  const [query, setQuery] = useState('');

  // Debounce expensive searches
  const debouncedQuery = useMemo(() => {
    const timeoutId = setTimeout(() => query, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />;
}
```

### تقسيم النماذج الكبيرة

بدلًا من مكوّن نموذج عملاق واحد، قسّمه إلى مكوّنات أصغر ومركّزة لا تُعاد تصييرها إلا حين تتغيّر حقولها المعنيّة.

## متى تستخدم مكتبات النماذج

للنماذج البسيطة (من حقلين إلى خمسة)، تكفي الأنماط أعلاه عادةً. لكن حين تصطدم بنماذج فيها 10 حقول فأكثر، أو بتحقّق معقّد، أو بتوليد حقول ديناميكي، ففكّر في الوصول إلى مكتبة:

- **[React Hook Form](https://react-hook-form.com/)**: إعادة تصيير في أدنى حد، ودعم ممتاز لـ TypeScript
- **[Formik](https://formik.org/)**: أكثر تقليدية، ومُرسَخة جيدًا
- **[React Final Form](https://final-form.org/react)**: تحديثات قائمة على الاشتراك، وأداء عالٍ جدًا

## الخلاصة

لا يلزم أن تكون النماذج في React مصدرًا لا ينتهي من الإحباط مع TypeScript. ومع الأنماط الصحيحة — معالِج أحداث عامة، وتحويل آمن للأرقام، وتحقّق وقت التشغيل — يمكنك بناء نماذج آمنة الأنواع وقابلة للصيانة في آن واحد.

أهم ما ينبغي أن تأخذه معك:

1. استخدم معالِج أحداث عامة لتقليل الشيفرة المتكرّرة
2. حوّل قيم حقول الأرقام صراحةً في كل مرة
3. أضِف أنواع TypeScript الصحيحة إلى كل معالِج أحداث
4. خُذ في الحسبان آثار الأداء في النماذج الكبيرة
5. لا تُعقّد الحالات البسيطة أكثر من اللازم

ابدأ بالأنماط البسيطة وأضِف التعقيد فقط حين تحتاج إليه. وستشكرك نسختك المستقبلية حين تنقّح النماذج في الساعة الثانية فجرًا ويكون كل شيء يعمل كما هو متوقّع.
