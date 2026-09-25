const e="patterns-dev",t="react",o="أنماط React وNext.js",n="hooks-pattern",c="نمط الخطافات (Hooks Pattern)",s=[{depth:2,id:"لماذا-أعادت-الخطافات-تشكيل-react",text:"لماذا أعادت الخطافات تشكيل React"},{depth:2,id:"القاعدةان-اللتان-تحكمان-كل-خطاف",text:"القاعدةان اللتان تحكمان كل خطاف"},{depth:2,id:"الخطافات-المدمجة-مصنفة",text:"الخطافات المدمجة، مصنّفة"},{depth:2,id:"الحالة-من-دون-أصناف",text:"الحالة من دون أصناف"},{depth:2,id:"الآثار-ولماذا-لا-ينبغي-لأن-تكون-معظم-الآثار-آثارا",text:"الآثار، ولماذا لا ينبغي لأن تكون معظم «الآثار» آثارًا"},{depth:2,id:"الخطافات-المخصصة-حيث-يستحق-النمط-مكانه",text:"الخطافات المخصصة: حيث يستحق النمط مكانه"},{depth:3,id:"uselocalstorage",text:"useLocalStorage"},{depth:3,id:"usemediaquery",text:"useMediaQuery"},{depth:2,id:"react-19-خطافات-للعمل-غير-المتزامن-والنماذج-والإجراءات",text:"React 19: خطافات للعمل غير المتزامن والنماذج والإجراءات"},{depth:3,id:"use-قراءة-الوعود-والسياق-بشكل-شرطي",text:"use() — قراءة الوعود والسياق بشكل شرطي"},{depth:3,id:"useactionstate-إدارة-حالة-إرسال-النموذج",text:"useActionState — إدارة حالة إرسال النموذج"},{depth:3,id:"useformstatus-قراءة-حالة-إرسال-النموذج-الأصل",text:"useFormStatus — قراءة حالة إرسال النموذج الأصل"},{depth:3,id:"useoptimistic-تحديث-متفائل-optimistic-update-وواجهة-فورية-قبل-تأكيد-الخادم",text:"useOptimistic — تحديث متفائل (optimistic update) وواجهة فورية قبل تأكيد الخادم"},{depth:2,id:"مصرف-react-ونهاية-التخزين-المؤقت-memoization-اليدوي",text:"مصرّف React ونهاية التخزين المؤقت (memoization) اليدوي"},{depth:2,id:"إعادة-هيكلة-عملية-من-الأصناف-إلى-الخطافات",text:"إعادة هيكلة عملية: من الأصناف إلى الخطافات"},{depth:2,id:"المفاضلات-والمخاطر",text:"المفاضلات والمخاطر"},{depth:2,id:"ما-ينبغي-تذكره",text:"ما ينبغي تذكّره"},{depth:2,id:"المراجع",text:"المراجع"}],r=`<h2 id="لماذا-أعادت-الخطافات-تشكيل-react">لماذا أعادت الخطافات تشكيل React</h2>
<p>عندما أطلقت React 16.8 الخطافات في مطلع عام 2019، أنهت بهدوء معظم أنماط التصميم التي كان مطوّرو React يتجادلون بشأنها لسنوات. المكوّنات من رتبة عليا (higher-order components)، وخصائص العرض (render props)، والخلط، وفصل الحاوية/العرضية (container/presentational)، جميعها وُجدت أساسًا للإجابة عن سؤال واحد: <em>كيف أشارك منطقًا ذا حالة بين المكوّنات من دون إعادة كتابته؟</em></p>
<p>الخطاف مجرد دالة. يمكنه الاحتفاظ بالحالة (state)، وتشغيل الآثار الجانبية (side effects)، وقراءة السياق، والاشتراك في مخازن خارجية. تستدعي المكوّنات الخطافات، وتستدعي الخطافات خطافات أخرى. لا يوجد مكوّن غلاف، ولا عقدة إضافية في الشجرة، ولا ربط بـ<code>this</code>، ولا دمج ضمني للخصائص. هذه البساطة المضللة هي جوهر القصة كلها.</p>
<p>انتقلت الخطافات الآن من كونها «الأمر الجديد» إلى كونها «الطريقة الوحيدة التي تُكتب بها معظم شيفرة React». أضافت React 19، التي أُطلقت في ديسمبر 2024، عدة خطافات جديدة إلى هذا النموذج، هي <code>use</code> و<code>useOptimistic</code> و<code>useActionState</code> و<code>useFormStatus</code>، تعتمد على Suspense وActions للتعامل مع العمل غير المتزامن الذي كان يتطلب سابقًا مكتبة حالة.</p>
<p>تغطي هذه المقالة الخطافات الأساسية التي ستستخدمها كل يوم، والقواعد التي تحكمها، وإضافات React 19، والأنماط التي تظهر عندما تبدأ في تركيب خطافاتك الخاصة.</p>
<h2 id="القاعدةان-اللتان-تحكمان-كل-خطاف">القاعدةان اللتان تحكمان كل خطاف</h2>
<p>قبل أي واجهة برمجية، القواعد. كلتاهما مفروضة بواسطة حزمة <a href="https://www.npmjs.com/package/eslint-plugin-react-hooks"><code>eslint-plugin-react-hooks</code></a>، فثبّتها منذ اليوم الأول.</p>
<ul>
<li><strong>استدع الخطافات في المستوى الأعلى فقط.</strong> لا تستدعها أبدًا داخل الحلقات أو الشروط أو الدوال المتداخلة. يتعرّف React على كل استدعاء خطاف من خلال <em>موضعه</em> في ترتيب الاستدعاءات، لذا يجب أن يبقى هذا الترتيب ثابتًا عبر عمليات العرض.</li>
<li><strong>استدع الخطافات من دوال React فقط.</strong> أي المكوّنات (<code>function MyComponent()</code>) أو الخطافات الأخرى (<code>function useMyThing()</code>). لا يمكن لدالة مساعدة عادية أن تستدعي <code>useState</code>.</li>
</ul>
<p>ينتج عن القاعدة 2 عرفٌ استخدام: يجب أن تبدأ أي دالة تستدعي الخطافات بـ<code>use</code>. ويستخدم المدقّق (linter) هذه البادئة ليعرف القواعد التي تنطبق.</p>
<pre><code>// Allowed: hook calling a hook
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
</code></pre>
<h2 id="الخطافات-المدمجة-مصنفة">الخطافات المدمجة، مصنّفة</h2>
<p>يوجد من الخطافات المدمجة عدد أكبر مما يتذكره معظم الناس. وييسّر تصنيفها حسب الغرض استخدامها:</p>
<table>
<thead>
<tr>
<th>الغرض</th>
<th>الخطافات</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الحالة</strong></td>
<td><code>useState</code> و<code>useReducer</code></td>
</tr>
<tr>
<td><strong>الآثار ودورة الحياة</strong></td>
<td><code>useEffect</code> و<code>useLayoutEffect</code> و<code>useInsertionEffect</code></td>
</tr>
<tr>
<td><strong>السياق</strong></td>
<td><code>useContext</code> و<code>use</code> (React 19)</td>
</tr>
<tr>
<td><strong>المراجع وDOM</strong></td>
<td><code>useRef</code> و<code>useImperativeHandle</code></td>
</tr>
<tr>
<td><strong>الأداء</strong></td>
<td><code>useMemo</code> و<code>useCallback</code> و<code>useTransition</code> و<code>useDeferredValue</code></td>
</tr>
<tr>
<td><strong>المخازن الخارجية</strong></td>
<td><code>useSyncExternalStore</code> و<code>useDebugValue</code></td>
</tr>
<tr>
<td><strong>النماذج والإجراءات (React 19)</strong></td>
<td><code>useActionState</code> و<code>useFormStatus</code> و<code>useOptimistic</code></td>
</tr>
<tr>
<td><strong>المعرّفات</strong></td>
<td><code>useId</code></td>
</tr>
</tbody>
</table>
<p>ربما تستخدم أربعة منها فقط في يوم عمل معيّن، وهي <code>useState</code> و<code>useEffect</code> و<code>useRef</code> وواحد من خطافات النماذج في React 19. أما البقية فموجودة لحل مشكلات محددة؛ فاستخدمها عند مواجهة تلك المشكلات.</p>
<h2 id="الحالة-من-دون-أصناف">الحالة من دون أصناف</h2>
<p>إضافة الحالة إلى مكوّن دالي سطران: ثنائي مُفكك بالقيمة الأولية.</p>
<pre><code>import { useState } from &quot;react&quot;;

function Counter() {
  const [count, setCount] = useState(0);
  return (
    &lt;button onClick={() =&gt; setCount((c) =&gt; c + 1)}&gt;
      Clicked {count} times
    &lt;/button&gt;
  );
}
</code></pre>
<p>هناك تفصيلان يستحقان الذكر:</p>
<ul>
<li><strong>مرّر دالة تحديث عندما تعتمد الحالة الجديدة على القديمة.</strong> <code>setCount((c) =&gt; c + 1)</code> آمن مع التجميع التلقائي في React؛ أما <code>setCount(count + 1)</code> فليست آمنة.</li>
<li><strong>يمكن حساب القيم الأولية بشيء من الكسل.</strong> مرّر دالة، مثل <code>useState(() =&gt; expensiveDefault())</code>، عندما تكون عملية حساب القيمة الأولية نفسها مكلفة. لا يستدعيها React إلا عند العرض الأول.</li>
</ul>
<p>للحالة التي تحتوي على قيم فرعية متعددة تُحدَّث معًا، فضّل <code>useReducer</code>. يجمع المُقلِّص (reducer) جميع الانتقالات في مكان واحد ويجعل اختبارها مباشرًا:</p>
<pre><code>type State = { status: &quot;idle&quot; | &quot;loading&quot; | &quot;ok&quot; | &quot;error&quot;; data?: Order[]; error?: Error };
type Action =
  | { type: &quot;fetch&quot; }
  | { type: &quot;success&quot;; data: Order[] }
  | { type: &quot;failure&quot;; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case &quot;fetch&quot;:   return { status: &quot;loading&quot; };
    case &quot;success&quot;: return { status: &quot;ok&quot;, data: action.data };
    case &quot;failure&quot;: return { status: &quot;error&quot;, error: action.error };
  }
}

function Orders() {
  const [state, dispatch] = useReducer(reducer, { status: &quot;idle&quot; });
  // ...
}
</code></pre>
<h2 id="الآثار-ولماذا-لا-ينبغي-لأن-تكون-معظم-الآثار-آثارا">الآثار، ولماذا لا ينبغي لأن تكون معظم «الآثار» آثارًا</h2>
<p>يمثّل <code>useEffect</code> مخرجًا للتعامل مع العالم <em>خارج</em> React: الاشتراكات، وواجهات المتصفح، وتسجيل الشبكة، وقياسات DOM اليدوية. وتؤكد وثائق React على هذا بصراحة:</p>
<blockquote>
<p>إذا لم يكن هناك نظام خارجي، فلا ينبغي أن تحتاج إلى تأثير. إزالة الآثار غير الضرورية تجعل شيفرتك أسهل في القراءة، وأسرع في التنفيذ، وأقل عرضة للأخطاء. — <a href="https://react.dev/learn/you-might-not-need-an-effect">react.dev — <em>ربما لا تحتاج إلى Effect</em></a></p>
</blockquote>
<p>فيما يلي بعض أكثر إساءات الاستخدام شيوعًا، مع طرائق لإصلاحها:</p>
<p><strong>1. حساب حالة مشتقة في Effect.</strong></p>
<pre><code>// Anti-pattern
const [fullName, setFullName] = useState(&quot;&quot;);
useEffect(() =&gt; {
  setFullName(\`\${first} \${last}\`);
}, [first, last]);

// Fix: just compute it
const fullName = \`\${first} \${last}\`;
</code></pre>
<p><strong>2. إعادة تعيين الحالة عند تغيّر خاصية.</strong></p>
<pre><code>// Anti-pattern: extra render after every prop change
useEffect(() =&gt; {
  setSelection(null);
}, [list]);

// Fix: use a \`key\` to remount the subtree, or store derived state with the prop value
</code></pre>
<p><strong>3. معالجة أحداث المستخدم.</strong></p>
<pre><code>// Anti-pattern: an effect that &quot;watches&quot; a form submission
useEffect(() =&gt; {
  if (justSubmitted) postOrder(values);
}, [justSubmitted]);

// Fix: do the work in the event handler itself
const onSubmit = (e) =&gt; {
  e.preventDefault();
  postOrder(values);
};
</code></pre>
<p>عندما <em>تحتاج فعلًا</em> إلى تأثير، يكون شكله شبه مطابق دائمًا: اشترك في جسم الدالة، ثم أعد دالة تنظيف.</p>
<pre><code>useEffect(() =&gt; {
  const id = setInterval(tick, 1000);
  return () =&gt; clearInterval(id);
}, []);
</code></pre>
<p>مصفوفة الاعتماديات ليست زينة اختيارية. كل ما تقرأه داخل التأثير ويأتي من الخصائص أو الحالة أو السياق يجب أن يظهر فيها، وإلا حصلت على إغلاق قديم (stale closures). وسيخبرك المدقّق بما ينقص منها.</p>
<h2 id="الخطافات-المخصصة-حيث-يستحق-النمط-مكانه">الخطافات المخصصة: حيث يستحق النمط مكانه</h2>
<p>الغرض من الخطافات ليس <code>useState</code>؛ بل القدرة على استخراج أي منطق ذي حالة إلى دالة وإعادة استخدامه. الخطاف المخصص مجرد دالة يبدأ اسمها بـ<code>use</code> ويُسمح له باستدعاء خطافات أخرى.</p>
<p>مثالان يستحقان مكانهما في كل قاعدة شيفرة تقريبًا.</p>
<h3 id="uselocalstorage"><code>useLocalStorage</code></h3>
<p>انسخ جزءًا من الحالة إلى <code>localStorage</code> بحيث يبقى بعد إعادة تحميل الصفحة.</p>
<pre><code>import { useEffect, useState } from &quot;react&quot;;

export function useLocalStorage&lt;T&gt;(key: string, initial: T) {
  const [value, setValue] = useState&lt;T&gt;(() =&gt; {
    if (typeof window === &quot;undefined&quot;) return initial; // SSR-safe
    const stored = window.localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : initial;
  });

  useEffect(() =&gt; {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
</code></pre>
<p>يقرأ استخدامُه تمامًا مثل <code>useState</code>:</p>
<pre><code>function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage&lt;&quot;light&quot; | &quot;dark&quot;&gt;(&quot;theme&quot;, &quot;light&quot;);
  return (
    &lt;button onClick={() =&gt; setTheme(theme === &quot;light&quot; ? &quot;dark&quot; : &quot;light&quot;)}&gt;
      Switch to {theme === &quot;light&quot; ? &quot;dark&quot; : &quot;light&quot;} mode
    &lt;/button&gt;
  );
}
</code></pre>
<blockquote>
<p><strong>هل ستنشر هذا؟</strong> اشترك في حدث <code>&quot;storage&quot;</code> الخاص بـ<code>window</code> لمزامنة عدة تبويبات مفتوحة، وفكّر في استخدام <a href="https://react.dev/reference/react/useSyncExternalStore"><code>useSyncExternalStore</code></a> بدلًا من الثنائي اليدوي <code>useState</code> + <code>useEffect</code>. صُمّم هذا الخطاف تحديدًا للحالات التي «تعكس فيها هذا الشيء الخارجي في React».</p>
</blockquote>
<h3 id="usemediaquery"><code>useMediaQuery</code></h3>
<p>اعرض فروعًا مبنية على استعلام وسائط CSS. وهو مفيد للتكيّف مع تفضيلات المستخدم مثل <code>prefers-reduced-motion</code> أو <code>prefers-color-scheme</code>.</p>
<pre><code>import { useEffect, useState } from &quot;react&quot;;

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =&gt;
    typeof window === &quot;undefined&quot; ? false : window.matchMedia(query).matches,
  );

  useEffect(() =&gt; {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) =&gt; setMatches(e.matches);
    mql.addEventListener(&quot;change&quot;, onChange);
    return () =&gt; mql.removeEventListener(&quot;change&quot;, onChange);
  }, [query]);

  return matches;
}

// Usage
function MotionAwareIntro() {
  const reduceMotion = useMediaQuery(&quot;(prefers-reduced-motion: reduce)&quot;);
  return reduceMotion ? &lt;StaticHero /&gt; : &lt;AnimatedHero /&gt;;
}
</code></pre>
<p>هناك خطافات أخرى يسعدك أن تكون في متناول اليد: <code>useDebounce</code> و<code>useOnlineStatus</code> و<code>useClipboard</code> و<code>usePrevious</code> و<code>useIntersectionObserver</code>. بدلًا من كتابتها جميعًا بنفسك، تصفّح مجموعة مختارة:</p>
<ul>
<li><a href="https://usehooks-ts.com/"><code>usehooks-ts</code></a> — يقدّم TypeScript أولًا ومختبرًا جيدًا</li>
<li><a href="https://github.com/streamich/react-use"><code>react-use</code></a> — مكتبة كبيرة تضم أدوات متنوعة</li>
<li><a href="https://usehooks.com/"><code>usehooks.com</code></a> — وصفات جاهزة للنسخ واللصق</li>
</ul>
<h2 id="react-19-خطافات-للعمل-غير-المتزامن-والنماذج-والإجراءات">React 19: خطافات للعمل غير المتزامن والنماذج والإجراءات</h2>
<p>تقدّم React 19 (المستقرة منذ ديسمبر 2024) عدة خطافات تغيّر طريقة تعاملك مع العمل غير المتزامن والنماذج. صُمّمت للعمل مع <strong>Actions</strong>، أي الدوال غير المتزامنة التي تمرّرها مباشرةً إلى \`\` أو تستدعيها من انتقال (transition).</p>
<h3 id="use-قراءة-الوعود-والسياق-بشكل-شرطي"><code>use()</code> — قراءة الوعود والسياق بشكل شرطي</h3>
<p><code>use</code> دالة خاصة (لا تخضع لقاعدة «عدم استدعاء الخطافات بشروط» عند فك تغليف وعد) تعلّق التنفيذ حتى يُحلّ الوعد، ثم تعيد قيمته. ويمكنها أيضًا قراءة السياق، لتحل محلّ استدعاءات كثيرة لـ<code>useContext</code>.</p>
<pre><code>import { use, Suspense } from &quot;react&quot;;

function Comments({ commentsPromise }: { commentsPromise: Promise&lt;Comment[]&gt; }) {
  // Suspends here until the promise settles
  const comments = use(commentsPromise);
  return &lt;ul&gt;{comments.map((c) =&gt; &lt;li key={c.id}&gt;{c.text}&lt;/li&gt;)}&lt;/ul&gt;;
}

export default function Post({ id }: { id: string }) {
  const commentsPromise = fetchComments(id); // started during render
  return (
    &lt;Suspense fallback={&lt;p&gt;Loading…&lt;/p&gt;}&gt;
      &lt;Comments commentsPromise={commentsPromise} /&gt;
    &lt;/Suspense&gt;
  );
}
</code></pre>
<p>داخل المكوّنات الخادمية (server components)، يتيح لك <code>use</code> إدخال بيانات غير متزامنة من دون رفعها إلى رحلة ذهاب وإياب منفصلة عبر <code>useEffect</code>.</p>
<h3 id="useactionstate-إدارة-حالة-إرسال-النموذج"><code>useActionState</code> — إدارة حالة إرسال النموذج</h3>
<p>يحل <code>useActionState</code> قدرًا كبيرًا من شيفرة <code>useState</code> المتكررة في النماذج. اقرنه بإجراء غير متزامن ليعيد أحدث نتيجة، وإجراء ملفوفًا، وعلم انتظار.</p>
<pre><code>import { useActionState } from &quot;react&quot;;

async function subscribeAction(_prev: State, formData: FormData) {
  const email = formData.get(&quot;email&quot;) as string;
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
    &lt;form action={formAction}&gt;
      &lt;input name=&quot;email&quot; type=&quot;email&quot; required /&gt;
      &lt;button type=&quot;submit&quot; disabled={isPending}&gt;
        {isPending ? &quot;Subscribing…&quot; : &quot;Subscribe&quot;}
      &lt;/button&gt;
      {state.ok &amp;&amp; &lt;p&gt;You're in.&lt;/p&gt;}
      {!state.ok &amp;&amp; &quot;error&quot; in state &amp;&amp; &lt;p&gt;{state.error}&lt;/p&gt;}
    &lt;/form&gt;
  );
}
</code></pre>
<h3 id="useformstatus-قراءة-حالة-إرسال-النموذج-الأصل"><code>useFormStatus</code> — قراءة حالة إرسال النموذج الأصل</h3>
<p>مفيد داخل زر أو حقل إدخال يحتاج إلى معرفة ما إذا كان النموذج الحيط يُرسل حاليًا، من دون الحاجة إلى تمرير الخصائص إلى أسفل الشجرة.</p>
<pre><code>import { useFormStatus } from &quot;react-dom&quot;;

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    &lt;button type=&quot;submit&quot; disabled={pending} aria-busy={pending}&gt;
      {children}
    &lt;/button&gt;
  );
}
</code></pre>
<h3 id="useoptimistic-تحديث-متفائل-optimistic-update-وواجهة-فورية-قبل-تأكيد-الخادم"><code>useOptimistic</code> — تحديث متفائل (optimistic update) وواجهة فورية قبل تأكيد الخادم</h3>
<p>اعرض النتيجة فورًا، ثم طابقها عندما يصل الاستجابة الحقيقي.</p>
<pre><code>import { useOptimistic, useTransition } from &quot;react&quot;;

function LikeButton({ post }: { post: Post }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(
    post.likes,
    (current, delta: number) =&gt; current + delta,
  );
  const [, startTransition] = useTransition();

  return (
    &lt;button
      onClick={() =&gt;
        startTransition(async () =&gt; {
          addOptimistic(1);
          await like(post.id);
        })
      }
    &gt;
      {optimisticLikes} likes
    &lt;/button&gt;
  );
}
</code></pre>
<h2 id="مصرف-react-ونهاية-التخزين-المؤقت-memoization-اليدوي">مصرّف React ونهاية التخزين المؤقت (memoization) اليدوي</h2>
<p>طوال سنوات، كانت <code>useMemo</code> و<code>useCallback</code> و<code>React.memo</code> الأدوات القياسية لإبقاء عمليات العرض رخيصة. وهي كذلك مصدر دائم للأخطاء (الإغلاق القديم، والاعتماديات المفقودة) والفوضى (تغليف كل دالة استدعاء بـ<code>useCallback</code> احتياطًا).</p>
<p>يحلل <a href="https://react.dev/learn/react-compiler">مصرّف React</a>، الذي أُطلق مع React 19، مكوّناتك تحليلًا ساكنًا ويدخل التخزين المؤقت المكافئ تلقائيًا. وتوضح الوثائق الرسمية ذلك بصراحة: المصرّف <em>«يتولى التخزين المؤقت نيابةً عنك، مما يلغي الحاجة إلى <code>useMemo</code> و<code>useCallback</code> و<code>React.memo</code> يدويًا»</em> في معظم الحالات.</p>
<p><strong>الآثار العملية:</strong></p>
<ul>
<li><strong>في المشاريع الجديدة مع تفعيل المصرّف،</strong> تخلَّ من التخزين المؤقت اليدوي ما لم يثبت تحليل الأداء أنك تحتاج إليه.</li>
<li><strong>في المشاريع القائمة،</strong> اترك التخزين المؤقت القائم في مكانه؛ فقد صُمّم المصرّف للعمل معه.</li>
<li><strong>اكتب شيفرة مألوفة.</strong> يكون المصرّف أكثر فاعلية عندما تكون المكوّنات خالصة، وتوضع الآثار الجانبية في دوال التأثير، ولا تعدّل الخصائص أو الحالة.</li>
</ul>
<h2 id="إعادة-هيكلة-عملية-من-الأصناف-إلى-الخطافات">إعادة هيكلة عملية: من الأصناف إلى الخطافات</h2>
<p>لجعل المقارنة ملموسة، إليك مكوّنًا صنفيًا صغيرًا يتتبع موضع تمرير المستخدم ويحفظه في تخزين الجلسة عند فك التركيب.</p>
<pre><code>class ScrollTracker extends React.Component&lt;{ pageId: string }, { y: number }&gt; {
  state = { y: 0 };
  onScroll = () =&gt; this.setState({ y: window.scrollY });

  componentDidMount() {
    window.addEventListener(&quot;scroll&quot;, this.onScroll, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener(&quot;scroll&quot;, this.onScroll);
    sessionStorage.setItem(\`scroll:\${this.props.pageId}\`, String(this.state.y));
  }
  render() {
    return &lt;ScrollIndicator y={this.state.y} /&gt;;
  }
}
</code></pre>
<p>وعند تحويله إلى مكوّن دالي مع خطاف مخصص، يُمنح <em>السلوك</em> اسمًا (<code>useScrollPosition</code>) ويصبح قابلًا لإعادة الاستخدام على نحو بديهي.</p>
<pre><code>function useScrollPosition() {
  const [y, setY] = useState(0);
  useEffect(() =&gt; {
    const onScroll = () =&gt; setY(window.scrollY);
    window.addEventListener(&quot;scroll&quot;, onScroll, { passive: true });
    return () =&gt; window.removeEventListener(&quot;scroll&quot;, onScroll);
  }, []);
  return y;
}

function ScrollTracker({ pageId }: { pageId: string }) {
  const y = useScrollPosition();
  useEffect(() =&gt; {
    return () =&gt; sessionStorage.setItem(\`scroll:\${pageId}\`, String(y));
  }, [pageId, y]);
  return &lt;ScrollIndicator y={y} /&gt;;
}
</code></pre>
<p>نسخة الخطاف أقصر، ولا تحتوي على <code>this</code>، ولا ربط لطرق، ولا طريقة دورة حياة عليك تذكرها، وأصبح منطق تتبّع التمرير وحدة يمكنك إدراجها في أي مكوّن.</p>
<h2 id="المفاضلات-والمخاطر">المفاضلات والمخاطر</h2>
<p>الخطافات ليست بلا تكلفة. كانت الأنماط التي حلّت محلها (HOCs، وخصائص العرض، والأصناف) ذات فوائد حقيقية في ظروف معينة، وللخطافات أساليب فشل خاصة بها تستحق المعرفة.</p>
<ul>
<li><strong>الإغلاق القديم.</strong> يلتقط كل عرض لقطة خاصة به من الحالة والخصائص. ويظل <code>setInterval</code> الذي أُنشئ في تأثير بلا اعتماديات يرى قيم <em>العرض الأول</em> فقط. الحل المعتاد هو <code>ref</code> أو مصفوفة اعتماديات صحيحة.</li>
<li><strong>الإفراط في استخدام التأثيرات.</strong> هذا هو الخطأ الأكثر شيوعًا في الخطافات. إذا كنت تستخدم <code>useEffect</code> لاستخراج حالة من الخصائص، أو للتفاعل مع نقرة، أو لمزامنة قطعتين من الحالة المحلية، فعلى الأرجح أنك لا تحتاج إلى تأثير.</li>
<li><strong>قواعد الترتيب المخفية.</strong> تبدو عبارة «استدع الخطافات في المستوى الأعلى فقط» بديهية، حتى تحاول العودة المبكرة قبل خطاف أو استدعاء واحد داخل <code>try/catch</code>. المدقّق صديقك؛ فثق به.</li>
<li><strong>سهولة الاختبار.</strong> يجب استدعاء الخطافات داخل مكوّن. اختبرها عبر مكوّن أو عبر أداة <code>renderHook</code> في <a href="https://testing-library.com/docs/react-testing-library/intro/"><code>@testing-library/react</code></a>، ولا تحاول استدعاءها مباشرةً.</li>
</ul>
<h2 id="ما-ينبغي-تذكره">ما ينبغي تذكّره</h2>
<ul>
<li>تتيح لك الخطافات استخراج أي منطق ذي حالة إلى دالة عادية يمكن للمكوّنات أو الخطافات الأخرى أن تركّبها.</li>
<li>قاعدتان: المستوى الأعلى فقط، ودوال React فقط. أداة التدقيق ستجعلك ملتزمًا بهما.</li>
<li><code>useEffect</code> مخصص للتعامل مع العالم الخارجي، لا لاستخراج الحالة من الخصائص أو التفاعل مع أحداث المستخدم.</li>
<li>تضيف React 19 خطافات من الدرجة الأولى للعمل غير المتزامن (<code>use</code>)، والنماذج (<code>useActionState</code> و<code>useFormStatus</code>)، وواجهة المستخدم المتفائلة (<code>useOptimistic</code>).</li>
<li>يلغي مصرّف React معظم الحاجة إلى <code>useMemo</code> و<code>useCallback</code> يدويًا؛ اكتب مكوّنات نظيفة ودع المحسّن يتولى الباقي.</li>
<li>عندما يبدأ المكوّن في الشعور بالتشابك، ابحث عن الأفعال المخفية داخله (<code>useScrollPosition</code> و<code>useDebouncedSearch</code> و<code>useFeatureFlag</code>) وارفعها إلى خطافات.</li>
</ul>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://react.dev/reference/react/hooks">مرجع الخطافات — react.dev</a></li>
<li><a href="https://react.dev/reference/rules/rules-of-hooks">قواعد الخطافات</a></li>
<li><a href="https://react.dev/learn/you-might-not-need-an-effect">ربما لا تحتاج إلى Effect</a></li>
<li><a href="https://react.dev/blog/2024/12/05/react-19">ملاحظات إصدار React 19</a></li>
<li><a href="https://react.dev/learn/react-compiler">مصرّف React</a></li>
<li><a href="https://usehooks-ts.com/"><code>usehooks-ts</code></a> — مكتبة خطافات تضع TypeScript أولًا</li>
</ul>
`,d={book:e,chapter:t,chapterTitle:o,slug:n,title:c,headings:s,html:r};export{e as book,t as chapter,o as chapterTitle,d as default,s as headings,r as html,n as slug,c as title};
