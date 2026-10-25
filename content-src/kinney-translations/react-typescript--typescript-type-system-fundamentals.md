---
title: "أساسيات نظام أنواع TypeScript"
---

قبل أن تتقن React مع TypeScript، تحتاج إلى فهم كيف يفكّر TypeScript في الأنواع. ليس كـ Java أو C# حيث الأنواع تدور حول الأصناف والوراثة. يستخدم TypeScript التصنيف البنيوي (structural typing) — إن مشى كبطّة وصوّت كبطّة، يقول TypeScript إنها بطّة. هذا الاختلاف الأساسي يغيّر كل شيء في كيفية كتابة الأنواع والتفكير فيها.

لنبنِ أساسًا متينًا في نظام أنواع TypeScript. متى فهمت هذه المفاهيم الأساسية، كل نمط في React سيصبح أكثر وضوحًا، وكل رسالة خطأ ستكون أوضح، وستكتب أنواعًا تساعد فعلًا بدل أن تعيق.

## التصنيف البنيوي: الأساس

TypeScript لا يهتم بالأسماء أو التصريحات — يهتم بالشكل. هذا أهم مفهوم يجب استيعابه. على عكس اللغات مُسمّاة التصنيف مثل Java أو C#، يستخدم TypeScript التصنيف البنيوي حيث يُحدَّد توافق الأنواع ببنية الأنواع، لا بأسمائها.

**انظر: [التصنيف البنيوي في TypeScript](https://stevekinney.com/courses/react-typescript/typescript-structural-typing)** لتغطية شاملة تتضمن:

- أنماط التصنيف البنيوي (duck typing)
- فحص الخصائص الزائدة (excess property checking)
- خصائص React (props) وتراكيب المكوّنات (component composition)
- قواعد توافق الأصناف (class compatibility rules)
- أنماط واقعية وأفضل الممارسات

## استنتاج الأنواع: دع TypeScript يعمل

TypeScript ممتاز في معرفة الأنواع. فهم متى تترك الاستنتاج يعمل ومتى تكون صريحًا هو مفتاح كتابة شيفرة نظيفة وقابلة للصيانة مع كمية أقل من الكود المعياري (boilerplate).

**انظر: [إتقان استنتاج الأنواع](https://stevekinney.com/courses/react-typescript/typescript-type-inference-mastery)** لتغطية شاملة تتضمن:

- متى الاعتماد على الاستنتاج مقابل الصراحة
- أنماط التصنيف السياقي (contextual typing)
- تأكيدات const (const assertions) والأنواع الحرفيّة (literal types)
- أنماط الاستنتاج الخاصة بـ React
- اعتبارات الأداء

## تضييق الأنواع: تحسين تدريجي للنوع

TypeScript يفهم تدفق التحكم ويضيّق الأنواع بناءً على منطق شيفرتك. هذا يمكّنك من كتابة شيفرة أكثر أمانًا مع فحص أنواع دقيق.

**انظر: [تضييق الأنواع وتدفق التحكم](https://stevekinney.com/courses/react-typescript/typescript-type-narrowing-control-flow)** لتغطية شاملة تتضمن:

- حرّاس الأنواع (type guards): `typeof` و`instanceof` وعامل `in`
- حرّاس الأنواع المخصّصة ودوال التأكيد (assertion functions)
- تحليل تدفق التحكم (control flow analysis)
- الاتحادات المميّزة (discriminated unions) وفحص الاستنفاد (exhaustiveness checking)
- أنماط التضييق الخاصة بـ React

## أمان الأنواع مع `unknown` و`any`

فهم الفرق بين `unknown` و`any` أساسي لسلامة الأنواع. بينما `any` يعطّل فحص الأنواع، `unknown` يتطلب منك التحقّق من الأنواع قبل الاستخدام.

**انظر: [`unknown` مقابل `any`](https://stevekinney.com/courses/react-typescript/typescript-unknown-vs-any)** لتغطية شاملة تتضمن:

- لماذا `any` خطر وكيف ينتشر
- معالجة الأنواع الديناميكية بأمان مع `unknown`
- نوع `never` لفحص الاستنفاد
- استراتيجيات الترحيل من `any` إلى `unknown`
- أنماط واقعية لمعالجة API بأمان الأنواع

## الأسماء المستعارة للأنواع مقابل الواجهات

متى تستخدم `type` مقابل `interface` سؤال شائع في TypeScript. بينما كلاهما يمكن أن يصف شكلاً لكائن، لكل منهما قدرات فريدة.

**الاختلافات الرئيسية:**

- **الواجهات (Interfaces)** الأفضل لأشكال الكائنات، تدعم دمج التصريحات (declaration merging)، وتعمل جيدًا مع الأصناف
- **الأسماء المستعارة للأنواع (Type aliases)** يمكن أن تمثّل أي نوع (اتحادات، tuples، أنواع بدائية)، تدعم أنواع التقاطع (intersection types)، وتعمل مع الأنواع المُخطّطة/الشرطية (mapped/conditional types)

**إرشادات سريعة:**

```typescript
// Use interface for object shapes
interface User {
  id: string;
  name: string;
}

// Use type for unions, functions, and complex types
type Status = 'idle' | 'loading' | 'success' | 'error';
type Handler = (event: Event) => void;
type Nullable<T> = T | null;
```

لمزيد من الأنماط مع الأسماء المستعارة للأنواع والواجهات، انظر:

- **[الاتحادات والتقاطعات والحرّاس](https://stevekinney.com/courses/react-typescript/typescript-unions-intersections-guards)** لأنماط الاتحاد والتقاطع
- **[أنواع الأدوات (Utility Types)](https://stevekinney.com/courses/react-typescript/typescript-utility-types-complete)** لتحويلات الأنواع المتقدمة

## الأنواع الحرفيّة والقوالب الحرفيّة

الأنواع الحرفيّة في TypeScript تسمح لك بتحديد قيم exact كأنواع، مما يمكّن فحص أنواع دقيق وأنماط manipulation للسلاسل الفعّالة.

**انظر: [أنواع القوالب الحرفيّة (Template Literal Types)](https://stevekinney.com/courses/react-typescript/typescript-template-literal-types)** لتغطية شاملة تتضمن:

- أنواع حرفيّة للسلاسل والأرقام والقيم المنطقية
- أنماط أنواع القوالب الحرفيّة
- أدوات manipulation للسلاسل
- أسماء خصائص ديناميكية ومعالجات الأحداث
- أنماط React واقعية

## تأكيدات الأنواع والتحويل (Casting)

أحيانًا تعرف أكثر من TypeScript عن نوع قيمة. تأكيدات الأنواع تسمح لك بتجاوز النوع المُستنتَج من TypeScript، لكن استخدمها بحذر — فهي تتجاوز سلامة الأنواع.

**أنماط شائعة:**

- صياغة `as` لتأكيدات الأنواع (مُفضّلة في JSX)
- عامل التأكيد غير null (`!`) عندما تكون متأكدًا من وجود قيمة
- `as const` لاستنتاج الأنواع الحرفيّة
- دوال التأكيد (assertion functions) للتحقّق من الأنواع في وقت التشغيل

**انظر: [تضييق الأنواع وتدفق التحكم](https://stevekinney.com/courses/react-typescript/typescript-type-narrowing-control-flow)** لبدائل أأمن باستخدام:

- حرّاس الأنواع بدل التأكيدات
- دوال التأكيد مع فحوصات وقت التشغيل
- تحليل تدفق التحكم للتضييق التلقائي

## أنواع الدوال والتحميل (Overloads)

الدوال في TypeScript تدعم أنماط typing قوية تتضمن التحميل (overloads)، المعاملات الاختيارية، والواجهات القابلة للاستدعاء.

**المفاهيم الرئيسية:**

- تعبيرات نوع الدالة لتحديد تواقيع الدوال
- تحميل الدوال لتوقيعات استدعاء متعددة
- معاملات اختيارية وrest
- دوال مع خصائص

**مواضيع ذات صلة:**

- **[العموميات (Generics) بعمق](https://stevekinney.com/courses/react-typescript/typescript-generics-deep-dive)** لأنماط دوال العموميات
- **[تضييق الأنواع](https://stevekinney.com/courses/react-typescript/typescript-type-narrowing-control-flow)** لدوال حرّاس الأنواع

```typescript
// Quick example: Function overloads
function parse(value: string): object;
function parse(value: number): string;
function parse(value: string | number): object | string {
  return typeof value === 'string' ? JSON.parse(value) : value.toString();
}
```

## الدوال العامة (Generic Functions) ومعاملات الأنواع

العموميات (generics) تمكّن من كتابة دوال قابلة لإعادة الاستخدام وأمن الأنواع تعمل مع أي نوع مع الحفاظ على علاقات الأنواع.

**انظر: [العموميات في TypeScript بعمق](https://stevekinney.com/courses/react-typescript/typescript-generics-deep-dive)** لتغطية شاملة تتضمن:

- دوال وواجهات وأصناف عمومية
- قيود الأنواع والأنواع الشرطية
- عموميات مكوّنات React
- أنماط متقدمة مع معاملات أنواع متعددة
- تطبيقات واقعية وأفضل الممارسات

## توقيعات الفهرس (Index Signatures) والأنواع الديناميكية

TypeScript يوفّر عدة طرق للعمل مع كائنات لها أسماء خصائص ديناميكية.

**الأنماط الرئيسية:**

- توقيعات الفهرس للوصول الديناميكي للخصائص
- أنواع Record لربط المفاتيح بالقيم
- أنماط القوالب الحرفيّة لأسماء الخصائص

**انظر التغطية المتقدمة:**

- **[الأنواع الشرطية والمُخطّطة (Conditional and Mapped Types)](https://stevekinney.com/courses/react-typescript/typescript-conditional-mapped-types)** لتحويلات الأنواع المُخطّطة
- **[أنواع القوالب الحرفيّة](https://stevekinney.com/courses/react-typescript/typescript-template-literal-types)** لأنماط القوالب الحرفيّة
- **[أنواع الأدوات (Utility Types)](https://stevekinney.com/courses/react-typescript/typescript-utility-types-complete)** لـ Record وPartial وأدوات أخرى

```typescript
// Quick example: Record type
type Status = 'idle' | 'loading' | 'success' | 'error';
type StatusMessages = Record<Status, string>;

const messages: StatusMessages = {
  idle: 'Ready',
  loading: 'Please wait...',
  success: 'Complete!',
  error: 'Something went wrong',
};
```

## أنظمة الوحدات (Module Systems) وتصريحات الأنواع

فهم نظام وحدات TypeScript أساسي لتنظيم الشيفرة والعمل مع المكتبات الخارجية.

**انظر: [الوحدات والتصريحات](https://stevekinney.com/courses/react-typescript/typescript-modules-declarations)** لتغطية شاملة تتضمن:

- وحدات ES وتوافق CommonJS
- استيرادات وتصديرات type-only
- ملفات التصريحات (declaration files) لمكتبات JavaScript
- أنماط augmentation للوحدات
- تصريحات أنواع namespace والعالمية (global)

## أفضل الممارسات والنمذجة الذهنية

### ابدأ محددًا، ووسّع عند الحاجة

```typescript
// ❌ Too wide initially
function processData(data: any) {
  // No type safety
}

// ✅ Start specific
function processUser(user: User) {
  // Full type safety
}

// ✅ Widen when needed with generics
function processEntity<T extends { id: string }>(entity: T) {
  // Flexible but safe
}
```

### استخدم أنواع Union للحالات

```typescript
// ❌ Multiple booleans
interface BadState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// ✅ Union types
type GoodState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: Data };
```

### فضّل استنتاج الأنواع

```typescript
// ❌ Unnecessary annotations
const name: string = 'Alice';
const age: number = 30;
const user: { name: string; age: number } = { name, age };

// ✅ Let TypeScript infer
const name = 'Alice';
const age = 30;
const user = { name, age };
```

### اجعل الحالات غير الصالحة غير قابلة للتمثيل

```typescript
// ❌ Invalid states possible
interface BadForm {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

// ✅ Invalid states impossible
type GoodForm =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; data: FormData }
  | { status: 'error'; error: string };
```

## خاتمة

هذه الأسس تشكّل bedrock فهم TypeScript. التصنيف البنيوي (structural typing) يعلّمك التفكير بالأشكال، لا الأسماء. استنتاج الأنواع يوضح متى تكتب الأنواع ومتى تترك TypeScript يعمل. تضييق الأنواع يكشف كيف يفهم TypeScript تدفق شيفرتك. والفرق بين `unknown` و`any` يبقي شيفرتك آمنة.

أتقن هذه المفاهيم، وأنماط React مع TypeScript ستبدو طبيعية. ستكتب أنواعًا تساعد بدل أن تعيق، وتلتقط الأخطاء في وقت الترجمة (compile time)، وتبني تطبيقات بثقة. نظام الأنواع ليس عبئًا — إنه أقوى أداة لديك لكتابة شيفرة قوية وقابلة للصيانة.
