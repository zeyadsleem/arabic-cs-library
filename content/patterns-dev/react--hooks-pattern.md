---
title: نمط الخطافات (Hooks Pattern)
lang: ar
source: https://www.patterns.dev/react/hooks-pattern/
---

## لماذا أعادت الخطافات تشكيل React

عندما أطلقت React 16.8 الخطافات في مطلع عام 2019، أنهت بهدوء معظم أنماط التصميم التي كان مطوّرو React يتجادلون بشأنها لسنوات. المكوّنات من رتبة عليا (higher-order components)، وخصائص العرض (render props)، والخلط، وفصل الحاوية/العرضية (container/presentational)، جميعها وُجدت أساسًا للإجابة عن سؤال واحد: *كيف أشارك منطقًا ذا حالة بين المكوّنات من دون إعادة كتابته؟*

الخطاف مجرد دالة. يمكنه الاحتفاظ بالحالة (state)، وتشغيل الآثار الجانبية (side effects)، وقراءة السياق، والاشتراك في مخازن خارجية. تستدعي المكوّنات الخطافات، وتستدعي الخطافات خطافات أخرى. لا يوجد مكوّن غلاف، ولا عقدة إضافية في الشجرة، ولا ربط بـ`this`، ولا دمج ضمني للخصائص. هذه البساطة المضللة هي جوهر القصة كلها.

انتقلت الخطافات الآن من كونها «الأمر الجديد» إلى كونها «الطريقة الوحيدة التي تُكتب بها معظم شيفرة React». أضافت React 19، التي أُطلقت في ديسمبر 2024، عدة خطافات جديدة إلى هذا النموذج، هي `use` و`useOptimistic` و`useActionState` و`useFormStatus`، تعتمد على Suspense وActions للتعامل مع العمل غير المتزامن الذي كان يتطلب سابقًا مكتبة حالة.

تغطي هذه المقالة الخطافات الأساسية التي ستستخدمها كل يوم، والقواعد التي تحكمها، وإضافات React 19، والأنماط التي تظهر عندما تبدأ في تركيب خطافاتك الخاصة.

## القاعدةان اللتان تحكمان كل خطاف

قبل أي واجهة برمجية، القواعد. كلتاهما مفروضة بواسطة حزمة [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)، فثبّتها منذ اليوم الأول.

- **استدع الخطافات في المستوى الأعلى فقط.** لا تستدعها أبدًا داخل الحلقات أو الشروط أو الدوال المتداخلة. يتعرّف React على كل استدعاء خطاف من خلال *موضعه* في ترتيب الاستدعاءات، لذا يجب أن يبقى هذا الترتيب ثابتًا عبر عمليات العرض.
- **استدع الخطافات من دوال React فقط.** أي المكوّنات (`function MyComponent()`) أو الخطافات الأخرى (`function useMyThing()`). لا يمكن لدالة مساعدة عادية أن تستدعي `useState`.

ينتج عن القاعدة 2 عرفٌ استخدام: يجب أن تبدأ أي دالة تستدعي الخطافات بـ`use`. ويستخدم المدقّق (linter) هذه البادئة ليعرف القواعد التي تنطبق.

```
// Allowed: hook calling a hook
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  // ...
}

// NOT allowed: condition wraps the hook
function Avatar({ user }) {
  if (user) {
    const [hovered, setHovered] = useState(false); // breaks rule 1
  }
}
```

## الخطافات المدمجة، مصنّفة

يوجد من الخطافات المدمجة عدد أكبر مما يتذكره معظم الناس. وييسّر تصنيفها حسب الغرض استخدامها:

| الغرض | الخطافات |
| --- | --- |
| **الحالة** | `useState` و`useReducer` |
| **الآثار ودورة الحياة** | `useEffect` و`useLayoutEffect` و`useInsertionEffect` |
| **السياق** | `useContext` و`use` (React 19) |
| **المراجع وDOM** | `useRef` و`useImperativeHandle` |
| **الأداء** | `useMemo` و`useCallback` و`useTransition` و`useDeferredValue` |
| **المخازن الخارجية** | `useSyncExternalStore` و`useDebugValue` |
| **النماذج والإجراءات (React 19)** | `useActionState` و`useFormStatus` و`useOptimistic` |
| **المعرّفات** | `useId` |

ربما تستخدم أربعة منها فقط في يوم عمل معيّن، وهي `useState` و`useEffect` و`useRef` وواحد من خطافات النماذج في React 19. أما البقية فموجودة لحل مشكلات محددة؛ فاستخدمها عند مواجهة تلك المشكلات.

## الحالة من دون أصناف

إضافة الحالة إلى مكوّن دالي سطران: ثنائي مُفكك بالقيمة الأولية.

```
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Clicked {count} times
    </button>
  );
}
```

هناك تفصيلان يستحقان الذكر:

- **مرّر دالة تحديث عندما تعتمد الحالة الجديدة على القديمة.** `setCount((c) => c + 1)` آمن مع التجميع التلقائي في React؛ أما `setCount(count + 1)` فليست آمنة.
- **يمكن حساب القيم الأولية بشيء من الكسل.** مرّر دالة، مثل `useState(() => expensiveDefault())`، عندما تكون عملية حساب القيمة الأولية نفسها مكلفة. لا يستدعيها React إلا عند العرض الأول.

للحالة التي تحتوي على قيم فرعية متعددة تُحدَّث معًا، فضّل `useReducer`. يجمع المُقلِّص (reducer) جميع الانتقالات في مكان واحد ويجعل اختبارها مباشرًا:

```
type State = { status: "idle" | "loading" | "ok" | "error"; data?: Order[]; error?: Error };
type Action =
  | { type: "fetch" }
  | { type: "success"; data: Order[] }
  | { type: "failure"; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "fetch":   return { status: "loading" };
    case "success": return { status: "ok", data: action.data };
    case "failure": return { status: "error", error: action.error };
  }
}

function Orders() {
  const [state, dispatch] = useReducer(reducer, { status: "idle" });
  // ...
}
```

## الآثار، ولماذا لا ينبغي لأن تكون معظم «الآثار» آثارًا

يمثّل `useEffect` مخرجًا للتعامل مع العالم *خارج* React: الاشتراكات، وواجهات المتصفح، وتسجيل الشبكة، وقياسات DOM اليدوية. وتؤكد وثائق React على هذا بصراحة:

> إذا لم يكن هناك نظام خارجي، فلا ينبغي أن تحتاج إلى تأثير. إزالة الآثار غير الضرورية تجعل شيفرتك أسهل في القراءة، وأسرع في التنفيذ، وأقل عرضة للأخطاء. — [react.dev — *ربما لا تحتاج إلى Effect*](https://react.dev/learn/you-might-not-need-an-effect)

فيما يلي بعض أكثر إساءات الاستخدام شيوعًا، مع طرائق لإصلاحها:

**1. حساب حالة مشتقة في Effect.**

```
// Anti-pattern
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(`${first} ${last}`);
}, [first, last]);

// Fix: just compute it
const fullName = `${first} ${last}`;
```

**2. إعادة تعيين الحالة عند تغيّر خاصية.**

```
// Anti-pattern: extra render after every prop change
useEffect(() => {
  setSelection(null);
}, [list]);

// Fix: use a `key` to remount the subtree, or store derived state with the prop value
```

**3. معالجة أحداث المستخدم.**

```
// Anti-pattern: an effect that "watches" a form submission
useEffect(() => {
  if (justSubmitted) postOrder(values);
}, [justSubmitted]);

// Fix: do the work in the event handler itself
const onSubmit = (e) => {
  e.preventDefault();
  postOrder(values);
};
```

عندما *تحتاج فعلًا* إلى تأثير، يكون شكله شبه مطابق دائمًا: اشترك في جسم الدالة، ثم أعد دالة تنظيف.

```
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

مصفوفة الاعتماديات ليست زينة اختيارية. كل ما تقرأه داخل التأثير ويأتي من الخصائص أو الحالة أو السياق يجب أن يظهر فيها، وإلا حصلت على إغلاق قديم (stale closures). وسيخبرك المدقّق بما ينقص منها.

## الخطافات المخصصة: حيث يستحق النمط مكانه

الغرض من الخطافات ليس `useState`؛ بل القدرة على استخراج أي منطق ذي حالة إلى دالة وإعادة استخدامه. الخطاف المخصص مجرد دالة يبدأ اسمها بـ`use` ويُسمح له باستدعاء خطافات أخرى.

مثالان يستحقان مكانهما في كل قاعدة شيفرة تقريبًا.

### `useLocalStorage`

انسخ جزءًا من الحالة إلى `localStorage` بحيث يبقى بعد إعادة تحميل الصفحة.

```
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial; // SSR-safe
    const stored = window.localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

يقرأ استخدامُه تمامًا مثل `useState`:

```
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}
```

> **هل ستنشر هذا؟** اشترك في حدث `"storage"` الخاص بـ`window` لمزامنة عدة تبويبات مفتوحة، وفكّر في استخدام [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) بدلًا من الثنائي اليدوي `useState` + `useEffect`. صُمّم هذا الخطاف تحديدًا للحالات التي «تعكس فيها هذا الشيء الخارجي في React».

### `useMediaQuery`

اعرض فروعًا مبنية على استعلام وسائط CSS. وهو مفيد للتكيّف مع تفضيلات المستخدم مثل `prefers-reduced-motion` أو `prefers-color-scheme`.

```
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// Usage
function MotionAwareIntro() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return reduceMotion ? <StaticHero /> : <AnimatedHero />;
}
```

هناك خطافات أخرى يسعدك أن تكون في متناول اليد: `useDebounce` و`useOnlineStatus` و`useClipboard` و`usePrevious` و`useIntersectionObserver`. بدلًا من كتابتها جميعًا بنفسك، تصفّح مجموعة مختارة:

- [`usehooks-ts`](https://usehooks-ts.com/) — يقدّم TypeScript أولًا ومختبرًا جيدًا
- [`react-use`](https://github.com/streamich/react-use) — مكتبة كبيرة تضم أدوات متنوعة
- [`usehooks.com`](https://usehooks.com/) — وصفات جاهزة للنسخ واللصق

## React 19: خطافات للعمل غير المتزامن والنماذج والإجراءات

تقدّم React 19 (المستقرة منذ ديسمبر 2024) عدة خطافات تغيّر طريقة تعاملك مع العمل غير المتزامن والنماذج. صُمّمت للعمل مع **Actions**، أي الدوال غير المتزامنة التي تمرّرها مباشرةً إلى `` أو تستدعيها من انتقال (transition).

### `use()` — قراءة الوعود والسياق بشكل شرطي

`use` دالة خاصة (لا تخضع لقاعدة «عدم استدعاء الخطافات بشروط» عند فك تغليف وعد) تعلّق التنفيذ حتى يُحلّ الوعد، ثم تعيد قيمته. ويمكنها أيضًا قراءة السياق، لتحل محلّ استدعاءات كثيرة لـ`useContext`.

```
import { use, Suspense } from "react";

function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  // Suspends here until the promise settles
  const comments = use(commentsPromise);
  return <ul>{comments.map((c) => <li key={c.id}>{c.text}</li>)}</ul>;
}

export default function Post({ id }: { id: string }) {
  const commentsPromise = fetchComments(id); // started during render
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

داخل المكوّنات الخادمية (server components)، يتيح لك `use` إدخال بيانات غير متزامنة من دون رفعها إلى رحلة ذهاب وإياب منفصلة عبر `useEffect`.

### `useActionState` — إدارة حالة إرسال النموذج

يحل `useActionState` قدرًا كبيرًا من شيفرة `useState` المتكررة في النماذج. اقرنه بإجراء غير متزامن ليعيد أحدث نتيجة، وإجراء ملفوفًا، وعلم انتظار.

```
import { useActionState } from "react";

async function subscribeAction(_prev: State, formData: FormData) {
  const email = formData.get("email") as string;
  try {
    await subscribe(email);
    return { ok: true } as const;
  } catch (err) {
    return { ok: false, error: (err as Error).message } as const;
  }
}

function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeAction, { ok: false });

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Subscribing…" : "Subscribe"}
      </button>
      {state.ok && <p>You're in.</p>}
      {!state.ok && "error" in state && <p>{state.error}</p>}
    </form>
  );
}
```

### `useFormStatus` — قراءة حالة إرسال النموذج الأصل

مفيد داخل زر أو حقل إدخال يحتاج إلى معرفة ما إذا كان النموذج الحيط يُرسل حاليًا، من دون الحاجة إلى تمرير الخصائص إلى أسفل الشجرة.

```
import { useFormStatus } from "react-dom";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {children}
    </button>
  );
}
```

### `useOptimistic` — تحديث متفائل (optimistic update) وواجهة فورية قبل تأكيد الخادم

اعرض النتيجة فورًا، ثم طابقها عندما يصل الاستجابة الحقيقي.

```
import { useOptimistic, useTransition } from "react";

function LikeButton({ post }: { post: Post }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(
    post.likes,
    (current, delta: number) => current + delta,
  );
  const [, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          addOptimistic(1);
          await like(post.id);
        })
      }
    >
      {optimisticLikes} likes
    </button>
  );
}
```

## مصرّف React ونهاية التخزين المؤقت (memoization) اليدوي

طوال سنوات، كانت `useMemo` و`useCallback` و`React.memo` الأدوات القياسية لإبقاء عمليات العرض رخيصة. وهي كذلك مصدر دائم للأخطاء (الإغلاق القديم، والاعتماديات المفقودة) والفوضى (تغليف كل دالة استدعاء بـ`useCallback` احتياطًا).

يحلل [مصرّف React](https://react.dev/learn/react-compiler)، الذي أُطلق مع React 19، مكوّناتك تحليلًا ساكنًا ويدخل التخزين المؤقت المكافئ تلقائيًا. وتوضح الوثائق الرسمية ذلك بصراحة: المصرّف *«يتولى التخزين المؤقت نيابةً عنك، مما يلغي الحاجة إلى `useMemo` و`useCallback` و`React.memo` يدويًا»* في معظم الحالات.

**الآثار العملية:**

- **في المشاريع الجديدة مع تفعيل المصرّف،** تخلَّ من التخزين المؤقت اليدوي ما لم يثبت تحليل الأداء أنك تحتاج إليه.
- **في المشاريع القائمة،** اترك التخزين المؤقت القائم في مكانه؛ فقد صُمّم المصرّف للعمل معه.
- **اكتب شيفرة مألوفة.** يكون المصرّف أكثر فاعلية عندما تكون المكوّنات خالصة، وتوضع الآثار الجانبية في دوال التأثير، ولا تعدّل الخصائص أو الحالة.

## إعادة هيكلة عملية: من الأصناف إلى الخطافات

لجعل المقارنة ملموسة، إليك مكوّنًا صنفيًا صغيرًا يتتبع موضع تمرير المستخدم ويحفظه في تخزين الجلسة عند فك التركيب.

```
class ScrollTracker extends React.Component<{ pageId: string }, { y: number }> {
  state = { y: 0 };
  onScroll = () => this.setState({ y: window.scrollY });

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    sessionStorage.setItem(`scroll:${this.props.pageId}`, String(this.state.y));
  }
  render() {
    return <ScrollIndicator y={this.state.y} />;
  }
}
```

وعند تحويله إلى مكوّن دالي مع خطاف مخصص، يُمنح *السلوك* اسمًا (`useScrollPosition`) ويصبح قابلًا لإعادة الاستخدام على نحو بديهي.

```
function useScrollPosition() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function ScrollTracker({ pageId }: { pageId: string }) {
  const y = useScrollPosition();
  useEffect(() => {
    return () => sessionStorage.setItem(`scroll:${pageId}`, String(y));
  }, [pageId, y]);
  return <ScrollIndicator y={y} />;
}
```

نسخة الخطاف أقصر، ولا تحتوي على `this`، ولا ربط لطرق، ولا طريقة دورة حياة عليك تذكرها، وأصبح منطق تتبّع التمرير وحدة يمكنك إدراجها في أي مكوّن.

## المفاضلات والمخاطر

الخطافات ليست بلا تكلفة. كانت الأنماط التي حلّت محلها (HOCs، وخصائص العرض، والأصناف) ذات فوائد حقيقية في ظروف معينة، وللخطافات أساليب فشل خاصة بها تستحق المعرفة.

- **الإغلاق القديم.** يلتقط كل عرض لقطة خاصة به من الحالة والخصائص. ويظل `setInterval` الذي أُنشئ في تأثير بلا اعتماديات يرى قيم *العرض الأول* فقط. الحل المعتاد هو `ref` أو مصفوفة اعتماديات صحيحة.
- **الإفراط في استخدام التأثيرات.** هذا هو الخطأ الأكثر شيوعًا في الخطافات. إذا كنت تستخدم `useEffect` لاستخراج حالة من الخصائص، أو للتفاعل مع نقرة، أو لمزامنة قطعتين من الحالة المحلية، فعلى الأرجح أنك لا تحتاج إلى تأثير.
- **قواعد الترتيب المخفية.** تبدو عبارة «استدع الخطافات في المستوى الأعلى فقط» بديهية، حتى تحاول العودة المبكرة قبل خطاف أو استدعاء واحد داخل `try/catch`. المدقّق صديقك؛ فثق به.
- **سهولة الاختبار.** يجب استدعاء الخطافات داخل مكوّن. اختبرها عبر مكوّن أو عبر أداة `renderHook` في [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/)، ولا تحاول استدعاءها مباشرةً.

## ما ينبغي تذكّره

- تتيح لك الخطافات استخراج أي منطق ذي حالة إلى دالة عادية يمكن للمكوّنات أو الخطافات الأخرى أن تركّبها.
- قاعدتان: المستوى الأعلى فقط، ودوال React فقط. أداة التدقيق ستجعلك ملتزمًا بهما.
- `useEffect` مخصص للتعامل مع العالم الخارجي، لا لاستخراج الحالة من الخصائص أو التفاعل مع أحداث المستخدم.
- تضيف React 19 خطافات من الدرجة الأولى للعمل غير المتزامن (`use`)، والنماذج (`useActionState` و`useFormStatus`)، وواجهة المستخدم المتفائلة (`useOptimistic`).
- يلغي مصرّف React معظم الحاجة إلى `useMemo` و`useCallback` يدويًا؛ اكتب مكوّنات نظيفة ودع المحسّن يتولى الباقي.
- عندما يبدأ المكوّن في الشعور بالتشابك، ابحث عن الأفعال المخفية داخله (`useScrollPosition` و`useDebouncedSearch` و`useFeatureFlag`) وارفعها إلى خطافات.

## المراجع

- [مرجع الخطافات — react.dev](https://react.dev/reference/react/hooks)
- [قواعد الخطافات](https://react.dev/reference/rules/rules-of-hooks)
- [ربما لا تحتاج إلى Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [ملاحظات إصدار React 19](https://react.dev/blog/2024/12/05/react-19)
- [مصرّف React](https://react.dev/learn/react-compiler)
- [`usehooks-ts`](https://usehooks-ts.com/) — مكتبة خطافات تضع TypeScript أولًا

