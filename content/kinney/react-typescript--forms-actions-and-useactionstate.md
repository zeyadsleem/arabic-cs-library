---
title: "النماذج المحدَّدة الأنواع، والإجرائات (Actions)، وuseActionState"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/forms-actions-and-useactionstate"
---

يقدّم React 19 نمطًا جديدًا قويًّا لمعالجة إرسال النماذج والتحولات (mutations): الإجرائات (Actions) وخُطّاف (hook) `useActionState`. وإذا سبق أن وجدتَ نفسك تتصارع مع التحقّق من النماذج، وحالات التحميل، ومعالجة الأخطاء، وتعقيدات TypeScript المصاحبة، ففي انتظارك معاملة لذيذة. إذ تُغلّف الإجرائات مسار إرسال النموذج بالكامل — من التحقّق، إلى التواصل مع الخادم، إلى تحديثات الحالة — بأسلوبٍ آمن الأنواع، إعلانيّ ومعقول.

في هذا التعمّق (deep dive)، سنستكشف كيف نستثمر TypeScript لنجعل التعامل مع النماذج متينًا، وقدرًا على التوسّع، وممتعًا في التعامل. وسنبدأ بمبادئ الإجرائات، ثم نتقدّم عبر أنماطٍ يزيد تعقيدًا يمكنك نشرها في الإنتاج فعلًا.

## ما الإجرائات ولماذا تهمّك؟

فكّر في الإجرائات (Actions) على أنها دوالٌ مدركة TypeScript تتولى دورة حياة تحوّل (mutation) نموذجٍ بالكامل. فعلى خلاف معالجة النماذج التقليدية حيث توازي `useState` و`useEffect` وعدّة قيم منطقية لتتبّع حالات التحميل، تُغلّف الإجرائات كلّ شيء في تدفّقٍ واحد متوقَّع.

إليك النموذج الذهني: الإجرائية دالةٌ تأخذ بيانات النموذج، وتُدبِّرها (تتحقّق منها، ترسلها إلى الخادم، تُحدّث الحالة المحلية)، وتُعيد نتيجةً تخبر واجهتك بما وقع. ويتولّى الخُطّاف `useActionState` التنفيذ ويعيد إليك كلّ ما تحتاجه — الحالة الراهنة، وحالة الانتظار (pending)، ومُطلق (dispatcher) الإجرائية نفسه.

يلمع هذا النمط لأنّه:

- **مركزية منطق التحول**: لا مزيد من تحديثات الحالة المُبعثرة عبر مكوّنات متعددة
- **توفير حالات التحميل آليًّا**: `pending` يتولَّاه عنك
- **تمكين من التحسين التدريجي (progressive enhancement)**: تعمل النماذج بلا JavaScript
- **تتعامل بلطفٍ مع TypeScript**: استنتاج كامل للأنواع من المدخلات إلى المخرجات

## إعداد الإجرائية الأساسي

لنبدأ من نموذج تواصل بسيط لنرى كيف تلتحم القطع معًا. وبالنسبة إلى أنماط التحقّق وقت التشغيل الشاملة بالاستعانة بـ Zod، انظر [جلب البيانات والتحقّق وقت التشغيل](https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation).

```typescript
// Define the shape of our form data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// This represents the result of our action
type ContactFormResult = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};
```

الآن الإجرائية نفسها. تستقبل الإجرائات الحالةَ السابقة (من `useActionState`) وبياناتَ النموذج:

```typescript
import { useActionState } from 'react';

async function submitContactForm(
  prevState: ContactFormResult,
  formData: FormData,
): Promise<ContactFormResult> {
  // Extract data from FormData
  const data: ContactFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  };

  // Basic validation
  const errors: Record<string, string[]> = {};
  if (!data.name) errors.name = ['Name is required'];
  if (!data.email || !data.email.includes('@')) errors.email = ['Invalid email address'];
  if (!data.message || data.message.length < 10)
    errors.message = ['Message must be at least 10 characters'];

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  try {
    // Simulate API call
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return {
      success: true,
      message: 'Thank you for your message!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}
```

وأخيرًا، لنشبّط هذا في المكوّن:

```typescript
function ContactForm() {
  const [state, action, isPending] = useActionState(submitContactForm, {
    success: false,
  });

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          required
          aria-invalid={state.errors?.name ? 'true' : 'false'}
        />
        {state.errors?.name && (
          <p className="error">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={state.errors?.email ? 'true' : 'false'}
        />
        {state.errors?.email && (
          <p className="error">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          aria-invalid={state.errors?.message ? 'true' : 'false'}
        />
        {state.errors?.message && (
          <p className="error">{state.errors.message[0]}</p>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {state.message && (
        <p className={state.success ? 'success' : 'error'}>
          {state.message}
        </p>
      )}
    </form>
  );
}
```

ما الذي يجري هنا؟ يعيد الخُطّاف (hook) `useActionState` ثلاثة أشياء:

1. **`state`**: النتيجة الراهنة من الإجرائية (قيمتك الافتراضية في البداية)
2. **`action`**: دالة يمكن أن تمرّرها إلى خاصية `action` في عنصر `<form>`
3. **`isPending`**: قيمة منطقية تساوي `true` ما دامت الإجرائية تعمل

> **نصيحة**
>
> لاحظ كيف نستخدم خصائص عناصر النماذج في HTML مثل `required` وقيم `aria-invalid` الصحيحة. هذا يضمن أن نموذجك يعمل حتى لو تعذّّر تحميل JavaScript — بذروة التحسين التدريجي (progressive enhancement).

## أمان الأنواع المتقدّم مع الإجرائات العامة

يعمل النمط الأساسي، لكن يمكن أن نجعله قابلًا لإعادة الاستخدام أكثر وأمان أنواع. وللتحقّق وقت التشغيل مع Zod، انظر [جلب البيانات والتحقّق وقت التشغيل](https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation). وهذا نهج يفضّل TypeScript أولًا عبر مُنشئ إجرائاتٍ عام:

```typescript
type ActionResult<TData = unknown> = {
  success: boolean;
  data?: TData;
  errors?: Record<string, string[]>;
  message?: string;
};

type ActionHandler<TInput, TOutput = unknown> = (input: TInput) => Promise<ActionResult<TOutput>>;
type Validator<T> = (
  data: unknown,
) => { valid: true; data: T } | { valid: false; errors: Record<string, string[]> };

function createAction<TInput, TOutput = unknown>(
  validator: Validator<TInput>,
  handler: ActionHandler<TInput, TOutput>,
) {
  return async function action(
    prevState: ActionResult<TOutput>,
    formData: FormData,
  ): Promise<ActionResult<TOutput>> {
    // Generic form data extraction
    const rawData = Object.fromEntries(formData);

    // Validate input
    const result = validator(rawData);

    if (!result.valid) {
      return {
        success: false,
        errors: result.errors,
      };
    }

    // Execute the handler
    try {
      return await handler(result.data);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  };
}
```

يمكننا الآن صنع إجرائاتٍ آمنة الأنواع بشيفرة قالبية (boilerplate) أقل بكثير:

```typescript
// Define our types and validators
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

const validateLogin: Validator<LoginData> = (data: unknown) => {
  const d = data as any;
  const errors: Record<string, string[]> = {};

  if (!d.email || !d.email.includes('@')) errors.email = ['Invalid email'];
  if (!d.password || d.password.length < 6)
    errors.password = ['Password must be at least 6 characters'];

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: d as LoginData };
};

const validateSignup: Validator<SignupData> = (data: unknown) => {
  const d = data as any;
  const errors: Record<string, string[]> = {};

  if (!d.email || !d.email.includes('@')) errors.email = ['Invalid email'];
  if (!d.password || d.password.length < 8)
    errors.password = ['Password must be at least 8 characters'];
  if (d.password !== d.confirmPassword) errors.confirmPassword = ["Passwords don't match"];

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: d as SignupData };
};

// Create typed Actions
const loginAction = createAction(validateLogin, async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const user = await response.json();

  return {
    success: true,
    data: user,
    message: 'Welcome back!',
  };
});

const signupAction = createAction(validateSignup, async (userData) => {
  // Remove confirmPassword before sending to API
  const { confirmPassword, ...signupData } = userData;

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }

  const user = await response.json();

  return {
    success: true,
    data: user,
    message: 'Account created successfully!',
  };
});
```

يمنحنا هذا النهج عدّة مزايا:

- **استنتاج الأنواع**: يعرف TypeScript تمامًا أيّ شكلٍ ستكون عليه بيانات نموذجك
- **تحقّق قابل لإعادة الاستخدام**: يتولّى `schema` التحقّق جهة العميل وجهة الخادم معًا
- **اتساق معالجة الأخطاء**: تتفرّع كل الإجرائات من النمط نفسه للخطأ/النجاح
- **تكرار أقل**: لا مزيد من نسخ منطق التحقّق بين المكوّنات

## التعامل مع حالات النماذج المعقّدة

النماذج الواقعية تحتاج غالبًا إلى إدارة حالة أكثر طموحًا. لننظر إلى معالج خطوات (wizard) متعدّد الخطوات بحقولٍ متداخلة وتحديثاتٍ متفائلة (optimistic updates):

```typescript
type WizardStep = 'personal' | 'billing' | 'confirmation';

type WizardState = {
  currentStep: WizardStep;
  personalInfo?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  billingInfo?: {
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: 'card' | 'paypal';
  };
  isComplete: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

// For runtime validation with Zod, see Data Fetching and Runtime Validation guide
const validatePersonalInfo = (data: any): { valid: boolean; errors?: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  if (!data.firstName) errors.firstName = ['First name is required'];
  if (!data.lastName) errors.lastName = ['Last name is required'];
  if (!data.email || !data.email.includes('@')) errors.email = ['Invalid email'];
  return Object.keys(errors).length > 0 ? { valid: false, errors } : { valid: true };
};

const validateBillingInfo = (data: any): { valid: boolean; errors?: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  if (!data.address) errors.address = ['Address is required'];
  if (!data.city) errors.city = ['City is required'];
  if (!data.zipCode || !/^\d{5}$/.test(data.zipCode)) errors.zipCode = ['Invalid ZIP code'];
  if (!['card', 'paypal'].includes(data.paymentMethod))
    errors.paymentMethod = ['Invalid payment method'];
  return Object.keys(errors).length > 0 ? { valid: false, errors } : { valid: true };
};

function createWizardAction() {
  return async function wizardAction(
    prevState: WizardState,
    formData: FormData,
  ): Promise<WizardState> {
    const step = formData.get('step') as WizardStep;
    const action = formData.get('action') as 'next' | 'previous' | 'submit';

    switch (action) {
      case 'previous': {
        const stepOrder: WizardStep[] = ['personal', 'billing', 'confirmation'];
        const currentIndex = stepOrder.indexOf(prevState.currentStep);
        const previousStep = stepOrder[Math.max(0, currentIndex - 1)];

        return {
          ...prevState,
          currentStep: previousStep,
          errors: undefined,
        };
      }

      case 'next': {
        if (step === 'personal') {
          const data = Object.fromEntries(formData);
          const result = validatePersonalInfo(data);

          if (!result.valid) {
            return {
              ...prevState,
              errors: result.errors,
            };
          }

          return {
            ...prevState,
            currentStep: 'billing',
            personalInfo: data as any,
            errors: undefined,
          };
        }

        if (step === 'billing') {
          const data = Object.fromEntries(formData);
          const result = validateBillingInfo(data);

          if (!result.valid) {
            return {
              ...prevState,
              errors: result.errors,
            };
          }

          return {
            ...prevState,
            currentStep: 'confirmation',
            billingInfo: data as any,
            errors: undefined,
          };
        }

        return prevState;
      }

      case 'submit': {
        if (!prevState.personalInfo || !prevState.billingInfo) {
          return {
            ...prevState,
            message: 'Please complete all steps',
          };
        }

        try {
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              personal: prevState.personalInfo,
              billing: prevState.billingInfo,
            }),
          });

          return {
            ...prevState,
            isComplete: true,
            message: 'Order submitted successfully!',
          };
        } catch (error) {
          return {
            ...prevState,
            message: 'Failed to submit order. Please try again.',
          };
        }
      }

      default:
        return prevState;
    }
  };
}
```

ويمكن لمكوّن المعالج بعدئذٍ أن يستخدم هذه الإجرائية لإدارة التدفّق بأكمله:

```typescript
function OrderWizard() {
  const [state, action, isPending] = useActionState(createWizardAction(), {
    currentStep: 'personal' as WizardStep,
    isComplete: false,
  });

  if (state.isComplete) {
    return (
      <div className="success">
        <h2>Order Complete!</h2>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action}>
      <div className="wizard-steps">
        <div className={`step ${state.currentStep === 'personal' ? 'active' : 'completed'}`}>
          Personal Info
        </div>
        <div className={`step ${state.currentStep === 'billing' ? 'active' : ''}`}>
          Billing
        </div>
        <div className={`step ${state.currentStep === 'confirmation' ? 'active' : ''}`}>
          Confirmation
        </div>
      </div>

      {state.currentStep === 'personal' && (
        <PersonalInfoStep
          data={state.personalInfo}
          errors={state.errors}
        />
      )}

      {state.currentStep === 'billing' && (
        <BillingInfoStep
          data={state.billingInfo}
          errors={state.errors}
        />
      )}

      {state.currentStep === 'confirmation' && (
        <ConfirmationStep
          personalInfo={state.personalInfo!}
          billingInfo={state.billingInfo!}
        />
      )}

      <div className="wizard-actions">
        {state.currentStep !== 'personal' && (
          <button
            type="submit"
            name="action"
            value="previous"
            disabled={isPending}
          >
            Previous
          </button>
        )}

        {state.currentStep !== 'confirmation' && (
          <button
            type="submit"
            name="action"
            value="next"
            name="step"
            value={state.currentStep}
            disabled={isPending}
          >
            {isPending ? 'Processing...' : 'Next'}
          </button>
        )}

        {state.currentStep === 'confirmation' && (
          <button
            type="submit"
            name="action"
            value="submit"
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Complete Order'}
          </button>
        )}
      </div>

      {state.message && (
        <p className="message">{state.message}</p>
      )}
    </form>
  );
}
```

> **ملاحظة**
>
> لاحظ كيف نستخدم حقول إدخال خفية وقيم أزرار لتمرير معلومات الخطوة إلى إجرائتنا. هذا يضمن بقاءَ النموذج عاملًا بلا JavaScript—فالخادم يستطيع معالجة نفس FormData.

## التحديثات المتفائلة (optimistic updates) والتفاعل الفوري

أحيانًا تريد إظهار ردّ فعلٍ فوريّ أثناء عمل الإجرائية. هكذا يُنفَّذ التحديثات المتفائلة مع إعادة تراجعٍ سليمة:

```typescript
type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  optimistic?: boolean; // Mark items as optimistically updated
};

type TodoState = {
  todos: TodoItem[];
  errors?: Record<string, string[]>;
  message?: string;
};

// See Data Fetching and Runtime Validation guide for Zod validation patterns
const validateAddTodo = (data: any): { valid: boolean; errors?: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  if (!data.text || data.text.length === 0) errors.text = ['Todo text is required'];
  return Object.keys(errors).length > 0 ? { valid: false, errors } : { valid: true };
};

const validateToggleTodo = (data: any): { valid: boolean; errors?: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  if (!data.todoId) errors.todoId = ['Todo ID is required'];
  return Object.keys(errors).length > 0 ? { valid: false, errors } : { valid: true };
};

function createTodoActions() {
  const addTodo = async (prevState: TodoState, formData: FormData): Promise<TodoState> => {
    const data = Object.fromEntries(formData);
    const result = validateAddTodo(data);

    if (!result.valid) {
      return {
        ...prevState,
        errors: result.errors,
      };
    }

    // Optimistic update - add the todo immediately
    const optimisticTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: data.text as string,
      completed: false,
      optimistic: true,
    };

    const optimisticState = {
      ...prevState,
      todos: [...prevState.todos, optimisticTodo],
      errors: undefined,
    };

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const newTodo = await response.json();

      // Replace optimistic todo with real one
      return {
        ...optimisticState,
        todos: optimisticState.todos.map((todo) =>
          todo.id === optimisticTodo.id ? { ...newTodo, optimistic: false } : todo,
        ),
        message: 'Todo added successfully!',
      };
    } catch (error) {
      // Rollback optimistic update
      return {
        ...prevState,
        message: 'Failed to add todo',
      };
    }
  };

  const toggleTodo = async (prevState: TodoState, formData: FormData): Promise<TodoState> => {
    const todoId = formData.get('todoId') as string;
    const completed = formData.get('completed') === 'true';

    // Optimistic update
    const optimisticState = {
      ...prevState,
      todos: prevState.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !completed, optimistic: true } : todo,
      ),
    };

    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) throw new Error('Failed to toggle todo');

      const updatedTodo = await response.json();

      return {
        ...optimisticState,
        todos: optimisticState.todos.map((todo) =>
          todo.id === todoId ? { ...updatedTodo, optimistic: false } : todo,
        ),
      };
    } catch (error) {
      // Rollback optimistic update
      return prevState;
    }
  };

  return { addTodo, toggleTodo };
}
```

ويمكن للمكوّن بعدها أن يقدّم ردّ فعلٍ فوريًّا:

```typescript
function TodoApp() {
  const { addTodo, toggleTodo } = createTodoActions();
  const [state, addAction, isAddPending] = useActionState(addTodo, {
    todos: [],
  });
  const [, toggleAction, isTogglePending] = useActionState(toggleTodo, state);

  return (
    <div>
      <form action={addAction}>
        <input
          name="text"
          placeholder="Add a todo..."
          required
        />
        <button type="submit" disabled={isAddPending}>
          {isAddPending ? 'Adding...' : 'Add'}
        </button>
        {state.errors?.text && (
          <p className="error">{state.errors.text[0]}</p>
        )}
      </form>

      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.optimistic ? 'optimistic' : ''}
          >
            <form action={toggleAction}>
              <input type="hidden" name="todoId" value={todo.id} />
              <input type="hidden" name="completed" value={String(todo.completed)} />
              <button
                type="submit"
                disabled={isTogglePending}
                className={`toggle ${todo.completed ? 'completed' : ''}`}
              >
                {todo.completed ? '✓' : '○'}
              </button>
            </form>

            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>

            {todo.optimistic && (
              <span className="loading">⏳</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## أنماط معالجة الأخطاء والاسترداد

تحتاج نماذج الإنتاج إلى معالجة أخطاء متينة. وهذا نمط لمعالجة أنواع مختلفة من الأخطاء مع تغذيةٍ راجعة مناسبة للمستخدم:

```typescript
enum ErrorType {
  VALIDATION = 'validation',
  NETWORK = 'network',
  SERVER = 'server',
  UNKNOWN = 'unknown',
}

type FormError = {
  type: ErrorType;
  message: string;
  field?: string;
  retryable?: boolean;
};

type RobustFormState = {
  success: boolean;
  data?: unknown;
  errors: FormError[];
  fieldErrors: Record<string, string[]>;
  retryCount: number;
  isRetrying: boolean;
};

// For runtime validation with Zod, see Data Fetching and Runtime Validation guide
type Validator<T> = (
  data: unknown,
) => { valid: true; data: T } | { valid: false; errors: Record<string, string[]> };

function createRobustAction<TInput>(
  validator: Validator<TInput>,
  handler: (input: TInput) => Promise<unknown>,
  options: {
    maxRetries?: number;
    retryDelay?: number;
  } = {},
) {
  const { maxRetries = 3, retryDelay = 1000 } = options;

  return async function robustAction(
    prevState: RobustFormState,
    formData: FormData,
  ): Promise<RobustFormState> {
    // Handle retry attempts
    if (formData.get('_action') === 'retry') {
      if (prevState.retryCount >= maxRetries) {
        return {
          ...prevState,
          errors: [
            ...prevState.errors,
            {
              type: ErrorType.UNKNOWN,
              message: 'Maximum retry attempts reached',
              retryable: false,
            },
          ],
        };
      }

      // Simulate retry delay
      await new Promise((resolve) => setTimeout(resolve, retryDelay));

      return {
        ...prevState,
        retryCount: prevState.retryCount + 1,
        isRetrying: true,
        errors: [],
      };
    }

    // Validate input
    const data = Object.fromEntries(formData);
    const result = validator(data);

    if (!result.valid) {
      const fieldErrors = result.errors;
      const errors: FormError[] = Object.entries(fieldErrors).map(([field, messages]) => ({
        type: ErrorType.VALIDATION,
        field,
        message: messages[0],
        retryable: false,
      }));

      return {
        success: false,
        errors,
        fieldErrors,
        retryCount: 0,
        isRetrying: false,
      };
    }

    try {
      const responseData = await handler(result.data);

      return {
        success: true,
        data: responseData,
        errors: [],
        fieldErrors: {},
        retryCount: 0,
        isRetrying: false,
      };
    } catch (error) {
      let errorType = ErrorType.UNKNOWN;
      let message = 'An unexpected error occurred';
      let retryable = false;

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorType = ErrorType.NETWORK;
        message = 'Network error. Please check your connection.';
        retryable = true;
      } else if (error instanceof Error) {
        if (error.message.includes('500')) {
          errorType = ErrorType.SERVER;
          message = 'Server error. Please try again.';
          retryable = true;
        } else if (error.message.includes('400')) {
          errorType = ErrorType.VALIDATION;
          message = 'Invalid request. Please check your input.';
          retryable = false;
        } else {
          message = error.message;
        }
      }

      return {
        success: false,
        errors: [{ type: errorType, message, retryable }],
        fieldErrors: {},
        retryCount: prevState.retryCount,
        isRetrying: false,
      };
    }
  };
}
```

وهكذا تستخدمه في مكوّن مع عرضٍ سليم للأخطاء ووظيفة إعادة محاولة:

```typescript
function RobustForm() {
  const submitAction = createRobustAction(
    ContactFormSchema,
    async (data) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    },
    { maxRetries: 3, retryDelay: 2000 }
  );

  const [state, action, isPending] = useActionState(submitAction, {
    success: false,
    errors: [],
    fieldErrors: {},
    retryCount: 0,
    isRetrying: false,
  });

  const networkErrors = state.errors.filter(e => e.type === ErrorType.NETWORK);
  const serverErrors = state.errors.filter(e => e.type === ErrorType.SERVER);
  const hasRetryableErrors = state.errors.some(e => e.retryable);

  return (
    <form action={action}>
      {/* Global error display */}
      {networkErrors.length > 0 && (
        <div className="error network-error">
          <h4>Connection Problem</h4>
          <p>{networkErrors[0].message}</p>
          {hasRetryableErrors && (
            <button
              type="submit"
              name="_action"
              value="retry"
              disabled={isPending}
            >
              {state.isRetrying ? 'Retrying...' : `Retry (${state.retryCount}/${3})`}
            </button>
          )}
        </div>
      )}

      {serverErrors.length > 0 && (
        <div className="error server-error">
          <h4>Server Error</h4>
          <p>{serverErrors[0].message}</p>
          <p className="help-text">
            If this problem persists, please contact support.
          </p>
        </div>
      )}

      {/* Regular form fields with validation errors */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          required
          aria-invalid={state.fieldErrors.name ? 'true' : 'false'}
        />
        {state.fieldErrors.name && (
          <p className="field-error">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      {/* ... other fields ... */}

      <button type="submit" disabled={isPending || state.isRetrying}>
        {isPending ? 'Submitting...' :
         state.isRetrying ? 'Retrying...' :
         'Submit'}
      </button>
    </form>
  );
}
```

> **تحذير**
>
> انتبه من إعادة المحاولة آليًّا في التحولات (mutations). مطلبك عادةً إعادة المحاولة للعمليات الآمنة فقط مثل جلب البيانات، لا للعمليات التي قد تترك أثرًا جانبيًّا مثل إنشاء سجلات أو معالجة مدفوعات.

## اعتبارات الأداء وأفضل الممارسات

كلّما ازداد تطوّر معالجة النماذج لديك، إليك أنماطًا تُبقي تطبيقك عالي الأداء:

### التحقّق المؤجَّل (debounced validation)

من أجل تحقّق لحظيٍّ لا يُثقل الخادم:

```typescript
function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// For runtime validation with Zod, see Data Fetching and Runtime Validation guide
type FieldValidator = (value: string) => string | null;

function createDebouncedValidation(
  validator: FieldValidator,
  asyncValidator?: (value: string) => Promise<string | null>
) {
  return function DebouncedField({
    name,
    value,
    onChange,
    ...props
  }: {
    name: string;
    value: string;
    onChange: (value: string) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>) {
    const [errors, setErrors] = useState<string[]>([]);
    const [isValidating, setIsValidating] = useState(false);
    const debouncedValue = useDebounced(value, 300);

    useEffect(() => {
      if (!debouncedValue) {
        setErrors([]);
        return;
      }

      const validate = async () => {
        setIsValidating(true);

        // Local validation first
        const localError = validator(debouncedValue);

        if (localError) {
          setErrors([localError]);
          setIsValidating(false);
          return;
        }

        // Async validation if provided
        if (asyncValidator) {
          try {
            const asyncError = await asyncValidator(debouncedValue);
            setErrors(asyncError ? [asyncError] : []);
          } catch (error) {
            setErrors(['Validation failed']);
          }
        } else {
          setErrors([]);
        }

        setIsValidating(false);
      };

      validate();
    }, [debouncedValue, validator, asyncValidator]);

    return (
      <div className="field-wrapper">
        <input
          {...props}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={errors.length > 0 ? 'true' : 'false'}
          className={`${props.className || ''} ${
            isValidating ? 'validating' : ''
          } ${errors.length > 0 ? 'error' : ''}`}
        />

        {isValidating && (
          <span className="validation-indicator">Validating...</span>
        )}

        {errors.map((error, index) => (
          <p key={index} className="field-error">{error}</p>
        ))}
      </div>
    );
  };
}
```

### حفظ نتائج الإجرائات في الذاكرة

منع إعادة التصيير غير الضرورية حين لا تتغيّر حالة الإجرائية تغيّرًا ذا معنى:

```typescript
function useStableActionState<TState>(
  action: (prevState: TState, formData: FormData) => Promise<TState>,
  initialState: TState,
  equalityFn?: (a: TState, b: TState) => boolean,
) {
  const [state, dispatch, isPending] = useActionState(action, initialState);

  const stableState = useMemo(
    () => state,
    [
      equalityFn ? state : JSON.stringify(state), // Simple deep comparison fallback
    ],
  );

  return [stableState, dispatch, isPending] as const;
}

// Usage with custom equality
const [state, action, isPending] = useStableActionState(
  myAction,
  initialState,
  (a, b) => a.errors === b.errors && a.message === b.message,
);
```

### تقسيم شيفرة الإجرائات

للتطبيقات الكبيرة، فكّر في التحميل الكسول (lazy loading) لتنفيذات الإجرائات:

```typescript
const LazyContactAction = lazy(() =>
  import('./actions/contact-action').then(module => ({
    default: module.contactAction
  }))
);

function ContactForm() {
  const [action, setAction] = useState<typeof contactAction | null>(null);
  const [state, dispatch, isPending] = useActionState(
    action || (async (prev) => prev),
    { success: false }
  );

  useEffect(() => {
    import('./actions/contact-action').then(module => {
      setAction(() => module.contactAction);
    });
  }, []);

  if (!action) {
    return <div>Loading form...</div>;
  }

  return (
    <form action={dispatch}>
      {/* Form fields */}
    </form>
  );
}
```

## الخطوات التالية والاستخدام في العالم الواقعي

الأنماط التي عُنيناها هنا تتوسّع من نماذج تواصل بسيطة إلى معالجات متعددة خطوات معقّدة، وما بينهما. وإليك جهات تستحق مزيدًا من الاستكشاف:

1. **إجرائات الخادم (Server Actions)**: إن كنت تستخدم مكوّنات React الخادمية (React Server Components)، يمكن للأجرائات أن تعمل على الخادم مباشرةً
2. **بثّ التحديثات (streaming updates)**: اجمع الإجرائات مع Suspense للتحميل المتدرّج
3. **مكتبات النماذج**: مكتبات مثل React Hook Form لديها الآن مهايئات (adapters) للإجرائات
4. **الاختبار**: الإجرائات مجرّد دوال، ما يجعل اختبارها بالوحدات سهلًا

النقطة المفتاحية أن الإجرائات مع `useActionState` تمنحك طريقةً إعلانية لنمذجة دورة حياة تحولات النماذج كاملةً. وبدمجها مع استنتاج الأنواع في TypeScript، تكسب أمانًا وتجربة مطوّر (developer experience) تجعلان التعامل مع النماذج ممتعًا فعلًا.

بدلًا من مشاحنة حالةٍ مُبعثرةٍ ومعالجات أحداثٍ أمْرِيّة، تَصِف ما ينبغي أن يقع عند إرسال النماذج—وReact يتولّى الباقي. فتصبح نماذجك أكثر قابلية للتنبّؤ، وتصير معالجة الأخطاء لديك أكثر اتساقًا، ويحصل مستخدموك على تجارب أفضل مع حالات تحميل سليمة وتحسينٍ تدريجيّ (progressive enhancement).

مستقبل معالجة النماذج في React مُحدَّدٌ بالأنواع، إعلانيّ، ومدهشٌ في مدى متعة العمل به. جرّب هذه الأنماط في مشروعك القادم—وقد تجد نفسك تتطلّع فعلًا إلى تنفيذ ذلك النموذج التالي.
