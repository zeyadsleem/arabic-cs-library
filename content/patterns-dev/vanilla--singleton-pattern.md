---
title: نمط المفرد (singleton)
lang: ar
source: https://www.patterns.dev/vanilla/singleton-pattern/
---

نمط المفرد (singleton) هو كائن موجود مرة واحدة فقط طوال عمر التطبيق. يحصل كل مستدعٍ عليه على النسخة نفسها — الحالة نفسها، والطرق نفسها، والهوية نفسها. يظهر هذا النمط متى كان هناك مورد مشترك فعلًا: مجموعة اتصالات بقاعدة بيانات، أو عميل أعلام ميزات يستعلم عن خدمة بعيدة، أو WebSocket يوزع الرسائل الواردة على مشتركين كثيرين، أو عميل تحليلات يجمع الأحداث قبل إرسالها.

في كل هذه الحالات، لا تريد وجود نسختين من الشيء نفسه. مجموعتا اتصالات تضاعفان عدد الاتصالات. أما عميلان للتحليلات فسيتنافسان عند الإرسال. إن نمط المفرد هو الإجابة التقليدية على: «تأكد من وجود نسخة واحدة، مهما تعددت الأماكن التي تطلبها».

مع ذلك، قبل استخدام النمط، من المفيد طرح سؤال سيعود إليه المقال: **هل تحتاج فعلًا إلى نمط مفرد، أم تحتاج فقط إلى قيمة تعيش في نطاق الوحدة (module scope)؟** في JavaScript الحديثة يُخلط غالبًا بين الأمرين، والخيار الثاني هو الأفضل في الغالبية العظمى من الحالات.

## خط أساس: نمط المفرد القائم على الأصناف

إليك تنفيذًا كلاسيكية حُدِّثت باستخدام حقول الأصناف الخاصة وواصف ثابت. سنستخدم عميل أعلام ميزات كمثال متواصل — وهي خدمة تحمّل قيم الأعلام مرة واحدة وتقدمها إلى بقية التطبيق.

```
class FeatureFlags {
  // Private static slot for the one instance
  static #instance = null;

  // Private state — invisible outside the class
  #flags = new Map();
  #loaded = false;

  constructor() {
    if (FeatureFlags.#instance) {
      return FeatureFlags.#instance;
    }
    FeatureFlags.#instance = this;
  }

  static getInstance() {
    return (FeatureFlags.#instance ??= new FeatureFlags());
  }

  async load(url) {
    if (this.#loaded) return;
    const res = await fetch(url);
    const data = await res.json();
    for (const [key, value] of Object.entries(data)) {
      this.#flags.set(key, value);
    }
    this.#loaded = true;
  }

  isEnabled(name) {
    return this.#flags.get(name) === true;
  }
}

export default FeatureFlags;
```

هناك أمران يستحقان الانتباه. يستخدم الحقل `#instance` حقلًا ساكنًا خاصًا وفق ES2022، ولذلك لا يمكن لأي شيفرة خارجية استبداله. كما يبقي الإسناد المنطقي `??=` (ES2021) فرع التهيئة الكسولة في سطر واحد واضح — أما `getInstance()` فيعيد النسخة الموجودة أو ينشئها.

لا ينشئ أي مستدعٍ هذه النسخة مباشرة:

```
import FeatureFlags from "./feature-flags.js";

const flags = FeatureFlags.getInstance();
await flags.load("/config/flags.json");

if (flags.isEnabled("new-checkout")) {
  // render the new flow
}
```

إذا استدعى مستدعٍ عنيد `new FeatureFlags()` مرتين، فإن الدالة المنشئة تختصر المسار وتعيد النسخة الموجودة — مع الحفاظ على هويتها وفق `===`. هذا الضمان هو جوهر النمط كله.

## البديل الحديث: الحالة في نطاق الوحدة

إليك عميل أعلام الميزات نفسه مكتوبًا دون أي من آليات نمط المفرد.

```
// feature-flags.js
const flags = new Map();
let loaded = false;

export async function load(url) {
  if (loaded) return;
  const res = await fetch(url);
  const data = await res.json();
  for (const [key, value] of Object.entries(data)) {
    flags.set(key, value);
  }
  loaded = true;
}

export function isEnabled(name) {
  return flags.get(name) === true;
}
```

تضمن مواصفة ESM تقييم الوحدة **مرة واحدة بالضبط** لكل نطاق واقع (realm). وكل ما يُعلن في المستوى الأعلى هو، بحكم التعريف، نسخة مفردة — تعيش المتغيرات طوال عمر سجل الوحدة، ويرى كل `import` من هذا الملف خريطة `flags` نفسها. لا توجد دالة منشئة ينبغي الدفاع عنها، ولا `getInstance` ينبغي تذكره، ولا خطر من استدعاء `new` عن طريق الخطأ.

في معظم مشكلات «أحتاج إلى واحد من هذه» داخل قاعدة شيفرة حديثة، تكون هذه هي الإجابة الصحيحة. يستحق النمط القائم على الأصناف التبرير عندما تحتاج حقًا إلى التغليف (الحقول الخاصة، والوراثة، وتعدد الأشكال)، أو عندما يلزم إنشاء النسخة كسولًا بإعدادات لا تتوفر وقت الاستيراد (import).

## متى لا تستخدم نمط المفرد

استخدم شيئًا آخر إذا صادفت أيًا من الحالات التالية:

- **تحتاج إلى حالة لكل طلب (request) أو لكل مستخدم.** النمط المفرد صالح على مستوى العملية كلها. في سياق العرض من الخادم (SSR) أو بلا خادم (serverless)، ستتسرب هذه الحالة عبر الطلبات — وهو مصدر كلاسيكي لأخطاء «لماذا يرى المستخدم A بيانات المستخدم B؟».
- **تحتاج إلى تبديل التنفيذ في الاختبارات.** يجعل ترميز `MyService.getInstance()` بعمق في شيفرتك استبدال النسخة مستحيلًا دون استخدام monkey-patching. احقن التبعية بدلًا من ذلك (المزيد عن ذلك أدناه).
- **ضمان «نسخة واحدة» مفروض بالاتفاق، لا بالضرورة.** إذا لم يحدث أي خلل عند وجود نسختين، فلد لديك كائن عادي، لا نمط مفرد.
- **أنت مغري باستخدامه كحاوية لكل حالات التطبيق.** هذه حزمة عالمية قابلة للتغيير بخطوات إضافية. استخدم حاوية حالة حقيقية.

## بدائل تستحق المعرفة

### حاويات حقن التبعيات (dependency injection)

تتيح مكتبات مثل [InversifyJS](https://inversify.io/) و[tsyringe](https://github.com/microsoft/tsyringe) تسجيل خدمة مرة واحدة وحلها في أي مكان، لكن الربط يُضبط في مكان واحد — عادةً عند جذر تركيب التطبيق (composition root).

```
import { container, singleton, inject } from "tsyringe";

@singleton()
class AnalyticsClient {
  track(event: string, props: Record<string, unknown>) { /* ... */ }
}

class CheckoutService {
  constructor(@inject(AnalyticsClient) private analytics: AnalyticsClient) {}

  complete(orderId: string) {
    this.analytics.track("order_completed", { orderId });
  }
}

const checkout = container.resolve(CheckoutService);
```

توفر حاوية حقن التبعيات ضمان «نسخة واحدة في كل مكان» نفسه، لكنها تتيح للاختبارات تسجيل ربط وهمي قبل الحل. هذا التغيير الواحد يتيح اختبارات وحدات معزولة بطريقة لا يستطيع نمط مفرد مصنوع يدويًا تحقيقها.

### سياق React لنطاق شجرة المكونات

في React، تعني «العالمية» عادةً «متاح لكل مكون في هذه الشجرة». يتيح لك كل من `createContext` والمزود (Provider) تحديد ذلك، مع ميزة إضافية هي أن النطاق هو الشجرة الفرعية؛ يمكنك تركيب قيمة مختلفة في اختبار أو قصة Storybook دون المساس بشيفرة الإنتاج.

```
const FeatureFlagsContext = createContext(null);

export function FeatureFlagsProvider({ client, children }) {
  return (
    <FeatureFlagsContext.Provider value={client}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlag(name) {
  const client = useContext(FeatureFlagsContext);
  return client.isEnabled(name);
}
```

### المخازن الخفيفة: Zustand وJotai وValtio

للحالة على مستوى التطبيق مع الاشتراكات، حلّت المخازن الحديثة إلى حد كبير محل الأنماط المفردة العشوائية. فمخزن Zustand، على سبيل المثال، دالة — لا صنف — تعيد خطّافًا مرتبطًا بحالة واحدة:

```
import { create } from "zustand";

export const useSession = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

يستطيع أي مكون قراءة الجلسة أو تحديثها من دون مزود أو استدعاء `getInstance`، كما يمكن محاكاة المخزن بسهولة في الاختبارات.

## المزايا والتكاليف

### الاختبارات هي الجزء الصعب

يحتفظ النمط المفرد بالحالة عبر الاختبارات بحكم تعريفه. إذا غيّر الاختبار A علمًا وقرأه الاختبار B، فقد ربطت اختباراتك معًا من خلال حالة عالمية خفية — ونمط الفشل هنا هو تذبذب يعتمد على ترتيب التنفيذ ويصعب تشخيصه بشدة. تشمل التخفيفات ما يلي:

- وفر دالة `reset()` وابداها في `beforeEach`.
- احقن النسخة المفردة عبر وسيط في الدالة المنشئة أو مصنع، كي تتمكن الاختبارات من تمرير نسخة جديدة.
- استخدم إعادة تعيين الوحدات في Vitest أو Jest (`vi.resetModules()` / `jest.resetModules()`) — لكن انتبه إلى أنها تعمل بسلاسة مع الحالة الموجودة في نطاق الوحدة، لا مع الأصناف التي تحتفظ بمرجع ساكن خاص بها.

### الاقتران المخفي

الدالة التي تستدعي `Logger.getInstance()` في أعماق جسمها تملك تبعية لا تظهر في توقيعها. وبعد شهرين، عندما يحاول أحدهم استخدام الدالة في سياق مختلف، يكتشف الاقتران بالطريقة الصعبة. الأفضل تمرير التبعية صراحةً:

```
// Hidden dependency
function processOrder(order) {
  Logger.getInstance().info("processing", order.id);
}

// Explicit — the contract is in the signature
function processOrder(order, logger) {
  logger.info("processing", order.id);
}
```

### تسرّب الحالة على الخادم

في عملية Node طويلة العمر تخدم طلبات كثيرة، تتشارك ذاكرة مؤقتة أو عداد على مستوى الوحدة عبر الطلبات. هذا مقبول للأدوات عديمة الحالة مثل مسجل مضبوط، لكنه كارثي لأي شيء ينبغي أن يكون خاصًا بكل طلب. توثق أطر مثل Next.js صراحةً أي الأنماط المفردة آمنة عبر الطلبات وأيها يحتاج إلى نطاق عبر `AsyncLocalStorage` أو ذاكرة React المؤقتة الخاصة بكل طلب.

### الوراثة والتهيئة الكسولة

تجعل تطبيقات النمط المفرد الكلاسيكي الوراثة محرجة — إذ يعيد الصنف الأب نسخته المخزنة بدلًا من إنشاء الصنف الفرعي. إذا كنت تحتاج حقًا إلى مصنع متعدد الأشكال («أعطني تنفيذ العميل المناسب»)، فذلك نمط مصنع (factory)، لا نمط مفرد.

## النمط المفرد مقابل الحالة في نطاق الوحدة مقابل الحالة العالمية

|  | صنف المفرد | الحالة في نطاق الوحدة | متغير عالمي |
| --- | --- | --- | --- |
| **نسخة واحدة لكل نطاق واقع** | نعم (مفروض) | نعم (ضمان ESM) | نعم |
| **التغليف** | قوي (حقول خاصة) | قوي (نطاق الوحدة) | لا شيء |
| **التهيئة الكسولة** | نعم | نعم (`await` على المستوى الأعلى) | لا |
| **قابل للاكتشاف في الاستيرادات** | نعم | نعم | لا (يُتاح عبر `window` / `globalThis`) |
| **قابل للاختبار بمعزل** | صعب | متوسط (إعادة تعيين الوحدة) | صعب |
| **الوراثة / تعدد الأشكال** | نعم | لا | لا |

الخلاصة: إذا كنت لا تحتاج ميزات الصنف، فالوحدة هي الإجابة الأبسط. وإذا كنت تحتاج إليها، فابنِ النمط المفرد على `#instance` وواصف ثابت — واحقنه عبر جذر تركيب التطبيق كي تتمكن الاختبارات من استبداله.

## المراجع

- [وحدات JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ميزات الأصناف الخاصة — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)
- [tsyringe — Microsoft](https://github.com/microsoft/tsyringe)
- [Zustand](https://github.com/pmndrs/zustand)
- [نمط المفرد — Refactoring Guru](https://refactoring.guru/design-patterns/singleton)
