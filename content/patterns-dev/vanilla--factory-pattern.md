---
title: نمط المصنع (factory)
lang: ar
source: https://www.patterns.dev/vanilla/factory-pattern/
---

المصنع (factory) دالة تتمثل مهمتها في *إعادة كائن* — ربما بأشكال كائن مختلفة وفق ما تمرره — من دون أن يضطر المستدع إلى التعامل مع `new` أو تسلسلات الأصناف أو معرفة النوع الملموس الذي يستلمه.

في JavaScript الحديثة، لا تحتاج تقريبًا إلى صنف لفعل ذلك. تكفي دالة تلتقط بعض الإعدادات وتعيد كائنًا حرفيًا. لم تعد الأسئلة المهمة «كيف أنفذ مصنعًا»، بل «متى يتفوق المصنع على صنف، ومتى يتفوق على اتحاد مميز أو حاوية حقن تبعيات؟»

## دالة مصنع بسيطة

```
const createLogger = ({ level = "info", prefix = "" } = {}) => {
  const ranks = { debug: 0, info: 1, warn: 2, error: 3 };
  const threshold = ranks[level];

  const log = (lvl, msg, ...rest) => {
    if (ranks[lvl] < threshold) return;
    console[lvl](`${prefix}${msg}`, ...rest);
  };

  return {
    debug: (m, ...r) => log("debug", m, ...r),
    info:  (m, ...r) => log("info", m, ...r),
    warn:  (m, ...r) => log("warn", m, ...r),
    error: (m, ...r) => log("error", m, ...r),
  };
};

const log = createLogger({ level: "warn", prefix: "[api] " });
log.info("ignored");          // silenced by threshold
log.warn("rate limit hit");   // [api] rate limit hit
```

هناك أمران يجعلان هذا يعمل بوصفه مصنعًا لا مجرد «دالة تعيد كائنًا»:

- **إنه يضم الإعداد.** تحدث خريطة `ranks` والبحث عن `threshold` مرة واحدة بالضبط، عند إنشاء المسجل. وكل استدعاء لـ`log.warn` يعيد استخدام القيم المغلقة.
- **إنه يعيد واجهة، لا نوعًا.** يعتمد المستدعون على الشكل `{ debug, info, warn, error }`. سواء أتى ذلك من صنف أو كائن حرفي أو Proxy، فالأمر غير مرئي لهم — وهذا هو الفصل الذي سعى المصنع دائمًا إلى تمكينه.

## مثال أكثر فائدة: مصنع لعميل (client) HTTP

الإعدادات التي تختلف حسب البيئة أو المستأجر أو الخدمة هي الحالة النموذجية للمصنع:

```
const createApiClient = ({ baseUrl, auth, fetch = globalThis.fetch }) => {
  const headers = () => ({
    "Content-Type": "application/json",
    ...(auth?.token && { Authorization: `Bearer ${auth.token}` }),
  });

  const request = async (method, path, body) => {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: headers(),
      body: body && JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.status === 204 ? null : res.json();
  };

  return {
    get:  (p)     => request("GET", p),
    post: (p, b)  => request("POST", p, b),
    put:  (p, b)  => request("PUT", p, b),
    del:  (p)     => request("DELETE", p),
  };
};

const api = createApiClient({
  baseUrl: "https://api.example.com",
  auth: { token: process.env.API_TOKEN },
});
```

لاحظ ما *غير* موجود هنا: لا `this` ولا `new` ولا وراثة ولا استدعاءات `bind`. والمُعامل `fetch` مقصود؛ فتمريره يجعل اختبار المصنع سهلًا إلى حد بعيد عبر تمرير نسخة وهمية.

## مصانع جداول البحث: مشكلة المركبة، بالطريقة الصحيحة

إذا كانت مهمة المصنع هي «اختيار التنفيذ المناسب بناءً على وسم نصي»، فلا تستسلم لرغبة كتابة `switch`. فجدول البحث أقصر وأسهل في التوسعة، وأصعب في نسيان تحديثه:

```
const fieldFactories = {
  text:     (props) => ({ type: "text",     ...props, validate: nonEmpty }),
  email:    (props) => ({ type: "email",    ...props, validate: isEmail }),
  number:   (props) => ({ type: "number",   ...props, validate: isFinite }),
  checkbox: (props) => ({ type: "checkbox", ...props, validate: () => true }),
};

const createField = ({ type, ...rest }) => {
  const make = fieldFactories[type];
  if (!make) throw new Error(`Unknown field type: ${type}`);
  return make(rest);
};
```

إضافة نوع حقل جديد تعني إضافة مفتاح إلى `fieldFactories` — بلا تحرير منطق التوزيع، وبلا تعارضات دمج في كتلة `switch` طويلة، ويمكنك فحص السجل (`Object.keys(fieldFactories)`) إذا احتجت إلى عرض واجهة «أنواع الحقول المدعومة».

الشكل نفسه — `componentMap[type]` — يقود معظم عارضات النماذج الديناميكية في React وVue، ومعظم أنظمة الإضافات التي تصدر في مكتبات JavaScript.

## المصنع مقابل الصنف مقابل حاوية حقن التبعيات

كثيرًا ما يختلط هذه الأنماط الثلاثة. فهي تحل مشكلات متداخلة، لكن تكلفتها مختلفة:

| الأسلوب | الأفضل لـ | التكلفة |
| --- | --- | --- |
| **صنف مع `new`** | كائنات طويلة العمر ذات هوية، وتعدد أشكال عبر `instanceof`، وطرق في المسار الساخن تستفيد من نموذج أولي مشترك | دلالات `this` وربطها، وصعوبة أكبر في التركيب والمحاكاة |
| **دالة مصنع** | التقاط الإعدادات، وتبديل البيئة، وإعادة أشكال مختلفة، وسهولة المحاكاة | إغلاق واحد لكل نسخة (الطرق لا تكون مشتركة) |
| **حاوية حقن تبعيات** (`tsyringe`، `InversifyJS`، مزودو NestJS) | توصيل رسوم الخدمات حيث تهم الملكية ودورة الحياة | بنية المزخرفات والبيانات الوصفية، ومفاجآت وقت التشغيل، وإفراط في التعقيد خارج التطبيقات الكبيرة |

قاعدة عملية مفيدة: إذا كنت ستستدعي `new SomeClass()` من أكثر من موضعين، فعادةً ما كنت تريد مصنعًا. وإذا كنت ستستدعي مصنعًا عبر حدود الوحدات مع مخاوف دورة حياة شاملة (نطاق الطلب، مفرد، عابر)، فقد تريد حاوية.

## مصانع آمنة النوع في TypeScript

أكبر مكسب للمصنع في TypeScript هو **الاتحاد المميز (discriminated union)** مع **أنواع إرجاع شرطية**. يحصل المستدعي على نوع دقيق وفق الوسم الذي مرره:

```
type FieldSpec =
  | { type: "text"; placeholder?: string }
  | { type: "number"; min?: number; max?: number }
  | { type: "checkbox"; defaultChecked?: boolean };

type Field<T extends FieldSpec["type"]> = Extract<FieldSpec, { type: T }> & {
  id: string;
  validate(value: unknown): boolean;
};

function createField<T extends FieldSpec["type"]>(
  spec: Extract<FieldSpec, { type: T }>
): Field<T> {
  // implementation
  return { id: crypto.randomUUID(), validate: () => true, ...spec } as Field<T>;
}

const a = createField({ type: "number", min: 0 }); // typed with `min`/`max`
const b = createField({ type: "text" });           // typed with `placeholder`
```

يضيّق المصرف شكل الإرجاع بناءً على مُميّز الإدخال. وهذا هو الجزء من النمط الذي لا تستطيع الأصناف نسخه بأمان حتى الآن من دون فوضى الأحمال الزائدة.

## التجفيف كمصنع خفيف

للكائنات ذات الدالة الواحدة، تكون الدالة المجففة *هي* المصنع:

```
const withRetries = (n) => async (fn) => {
  for (let i = 0; i < n; i++) {
    try { return await fn(); }
    catch (e) { if (i === n - 1) throw e; }
  }
};

const retry3 = withRetries(3);
await retry3(() => fetch("/flaky"));
```

`withRetries(3)` استدعاء مصنع يعيد إغلاقًا مُعلمًا بالمُعامل `n`. وعندما يحتوي «الكائن» الذي ستعيده على طريقة واحدة بالضبط، فتجاوز الكائن الحرفي.

## متى لا تستخدم مصنعًا

- **لا تبنيه إلا بطريقة واحدة أبدًا.** المصنع الذي لا يمرر موقع الاستدعاء الوحيد نفسه إلا خيارات ثابتة ليس سوى دالة منشئة بخطوات إضافية. ضمّنه.
- **تحتاج إلى فحوص `instanceof`.** تعيد المصانع كائنات عادية؛ فلا يوجد صنف للتحقق منه. إذا كان المستدعون يتفرعون حسب النوع باستخدام `instanceof`، فأنت تريد صنفًا، أو حقل تمييز في الكائن المعاد.
- **أنت مغري بإعادة مكون React أو Vue.** مصانع المكونات التي تلتقط حالة وقت العرض تسوء عادةً مع الخطافات والتفاعلية. استخدم التركيب أو المكونات عالية الترتيب بدلًا من ذلك.
- **«المصنع» ليس سوى `new X()` ملفوفًا.** هذا ليس تجريدًا، بل ضجيج.

## المقايضات

| الفائدة | التكلفة |
| --- | --- |
| لا `new` ولا `this` ولا أخطاء ربط | لا نموذج أولي مشترك — تُعاد تخصيص الطرق لكل نسخة |
| سهولة تبديل التنفيذ خلف واجهة مستقرة | لا `instanceof` لفحوص النوع في وقت التشغيل |
| سهولة المحاكاة (تمرير بدائل عبر الخيارات) | توزيع جدول البحث يفقد أدوات الوصول الساكن (البحث عن جميع مراجع طريقة صنف) |
| يتركب بسلاسة مع الإغلاقات والتطبيق الجزئي | قد يخفي تعقيدًا يكون تمثيله في صنف أكثر أمانةً |

## المراجع

- [JavaScript Factory Functions with ES6+](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1) - Eric Elliott
- [الاتحادات المميزة في TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) - دليل TypeScript
- [tsyringe](https://github.com/microsoft/tsyringe) - حاوية خفيفة لحقن التبعيات في TypeScript
