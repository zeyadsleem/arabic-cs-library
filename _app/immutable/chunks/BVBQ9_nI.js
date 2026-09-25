const t="patterns-dev",n="vanilla",e="أنماط JavaScript",o="singleton-pattern",r="نمط المفرد (singleton)",d=[{depth:2,id:"خط-أساس-نمط-المفرد-القائم-على-الأصناف",text:"خط أساس: نمط المفرد القائم على الأصناف"},{depth:2,id:"البديل-الحديث-الحالة-في-نطاق-الوحدة",text:"البديل الحديث: الحالة في نطاق الوحدة"},{depth:2,id:"متى-لا-تستخدم-نمط-المفرد",text:"متى لا تستخدم نمط المفرد"},{depth:2,id:"بدائل-تستحق-المعرفة",text:"بدائل تستحق المعرفة"},{depth:3,id:"حاويات-حقن-التبعيات-dependency-injection",text:"حاويات حقن التبعيات (dependency injection)"},{depth:3,id:"سياق-react-لنطاق-شجرة-المكونات",text:"سياق React لنطاق شجرة المكونات"},{depth:3,id:"المخازن-الخفيفة-zustand-وjotai-وvaltio",text:"المخازن الخفيفة: Zustand وJotai وValtio"},{depth:2,id:"المزايا-والتكاليف",text:"المزايا والتكاليف"},{depth:3,id:"الاختبارات-هي-الجزء-الصعب",text:"الاختبارات هي الجزء الصعب"},{depth:3,id:"الاقتران-المخفي",text:"الاقتران المخفي"},{depth:3,id:"تسرب-الحالة-على-الخادم",text:"تسرّب الحالة على الخادم"},{depth:3,id:"الوراثة-والتهيئة-الكسولة",text:"الوراثة والتهيئة الكسولة"},{depth:2,id:"النمط-المفرد-مقابل-الحالة-في-نطاق-الوحدة-مقابل-الحالة-العالمية",text:"النمط المفرد مقابل الحالة في نطاق الوحدة مقابل الحالة العالمية"},{depth:2,id:"المراجع",text:"المراجع"}],s=`<p>نمط المفرد (singleton) هو كائن موجود مرة واحدة فقط طوال عمر التطبيق. يحصل كل مستدعٍ عليه على النسخة نفسها — الحالة نفسها، والطرق نفسها، والهوية نفسها. يظهر هذا النمط متى كان هناك مورد مشترك فعلًا: مجموعة اتصالات بقاعدة بيانات، أو عميل أعلام ميزات يستعلم عن خدمة بعيدة، أو WebSocket يوزع الرسائل الواردة على مشتركين كثيرين، أو عميل تحليلات يجمع الأحداث قبل إرسالها.</p>
<p>في كل هذه الحالات، لا تريد وجود نسختين من الشيء نفسه. مجموعتا اتصالات تضاعفان عدد الاتصالات. أما عميلان للتحليلات فسيتنافسان عند الإرسال. إن نمط المفرد هو الإجابة التقليدية على: «تأكد من وجود نسخة واحدة، مهما تعددت الأماكن التي تطلبها».</p>
<p>مع ذلك، قبل استخدام النمط، من المفيد طرح سؤال سيعود إليه المقال: <strong>هل تحتاج فعلًا إلى نمط مفرد، أم تحتاج فقط إلى قيمة تعيش في نطاق الوحدة (module scope)؟</strong> في JavaScript الحديثة يُخلط غالبًا بين الأمرين، والخيار الثاني هو الأفضل في الغالبية العظمى من الحالات.</p>
<h2 id="خط-أساس-نمط-المفرد-القائم-على-الأصناف">خط أساس: نمط المفرد القائم على الأصناف</h2>
<p>إليك تنفيذًا كلاسيكية حُدِّثت باستخدام حقول الأصناف الخاصة وواصف ثابت. سنستخدم عميل أعلام ميزات كمثال متواصل — وهي خدمة تحمّل قيم الأعلام مرة واحدة وتقدمها إلى بقية التطبيق.</p>
<pre><code>class FeatureFlags {
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
</code></pre>
<p>هناك أمران يستحقان الانتباه. يستخدم الحقل <code>#instance</code> حقلًا ساكنًا خاصًا وفق ES2022، ولذلك لا يمكن لأي شيفرة خارجية استبداله. كما يبقي الإسناد المنطقي <code>??=</code> (ES2021) فرع التهيئة الكسولة في سطر واحد واضح — أما <code>getInstance()</code> فيعيد النسخة الموجودة أو ينشئها.</p>
<p>لا ينشئ أي مستدعٍ هذه النسخة مباشرة:</p>
<pre><code>import FeatureFlags from &quot;./feature-flags.js&quot;;

const flags = FeatureFlags.getInstance();
await flags.load(&quot;/config/flags.json&quot;);

if (flags.isEnabled(&quot;new-checkout&quot;)) {
  // render the new flow
}
</code></pre>
<p>إذا استدعى مستدعٍ عنيد <code>new FeatureFlags()</code> مرتين، فإن الدالة المنشئة تختصر المسار وتعيد النسخة الموجودة — مع الحفاظ على هويتها وفق <code>===</code>. هذا الضمان هو جوهر النمط كله.</p>
<h2 id="البديل-الحديث-الحالة-في-نطاق-الوحدة">البديل الحديث: الحالة في نطاق الوحدة</h2>
<p>إليك عميل أعلام الميزات نفسه مكتوبًا دون أي من آليات نمط المفرد.</p>
<pre><code>// feature-flags.js
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
</code></pre>
<p>تضمن مواصفة ESM تقييم الوحدة <strong>مرة واحدة بالضبط</strong> لكل نطاق واقع (realm). وكل ما يُعلن في المستوى الأعلى هو، بحكم التعريف، نسخة مفردة — تعيش المتغيرات طوال عمر سجل الوحدة، ويرى كل <code>import</code> من هذا الملف خريطة <code>flags</code> نفسها. لا توجد دالة منشئة ينبغي الدفاع عنها، ولا <code>getInstance</code> ينبغي تذكره، ولا خطر من استدعاء <code>new</code> عن طريق الخطأ.</p>
<p>في معظم مشكلات «أحتاج إلى واحد من هذه» داخل قاعدة شيفرة حديثة، تكون هذه هي الإجابة الصحيحة. يستحق النمط القائم على الأصناف التبرير عندما تحتاج حقًا إلى التغليف (الحقول الخاصة، والوراثة، وتعدد الأشكال)، أو عندما يلزم إنشاء النسخة كسولًا بإعدادات لا تتوفر وقت الاستيراد (import).</p>
<h2 id="متى-لا-تستخدم-نمط-المفرد">متى لا تستخدم نمط المفرد</h2>
<p>استخدم شيئًا آخر إذا صادفت أيًا من الحالات التالية:</p>
<ul>
<li><strong>تحتاج إلى حالة لكل طلب (request) أو لكل مستخدم.</strong> النمط المفرد صالح على مستوى العملية كلها. في سياق العرض من الخادم (SSR) أو بلا خادم (serverless)، ستتسرب هذه الحالة عبر الطلبات — وهو مصدر كلاسيكي لأخطاء «لماذا يرى المستخدم A بيانات المستخدم B؟».</li>
<li><strong>تحتاج إلى تبديل التنفيذ في الاختبارات.</strong> يجعل ترميز <code>MyService.getInstance()</code> بعمق في شيفرتك استبدال النسخة مستحيلًا دون استخدام monkey-patching. احقن التبعية بدلًا من ذلك (المزيد عن ذلك أدناه).</li>
<li><strong>ضمان «نسخة واحدة» مفروض بالاتفاق، لا بالضرورة.</strong> إذا لم يحدث أي خلل عند وجود نسختين، فلد لديك كائن عادي، لا نمط مفرد.</li>
<li><strong>أنت مغري باستخدامه كحاوية لكل حالات التطبيق.</strong> هذه حزمة عالمية قابلة للتغيير بخطوات إضافية. استخدم حاوية حالة حقيقية.</li>
</ul>
<h2 id="بدائل-تستحق-المعرفة">بدائل تستحق المعرفة</h2>
<h3 id="حاويات-حقن-التبعيات-dependency-injection">حاويات حقن التبعيات (dependency injection)</h3>
<p>تتيح مكتبات مثل <a href="https://inversify.io/">InversifyJS</a> و<a href="https://github.com/microsoft/tsyringe">tsyringe</a> تسجيل خدمة مرة واحدة وحلها في أي مكان، لكن الربط يُضبط في مكان واحد — عادةً عند جذر تركيب التطبيق (composition root).</p>
<pre><code>import { container, singleton, inject } from &quot;tsyringe&quot;;

@singleton()
class AnalyticsClient {
  track(event: string, props: Record&lt;string, unknown&gt;) { /* ... */ }
}

class CheckoutService {
  constructor(@inject(AnalyticsClient) private analytics: AnalyticsClient) {}

  complete(orderId: string) {
    this.analytics.track(&quot;order_completed&quot;, { orderId });
  }
}

const checkout = container.resolve(CheckoutService);
</code></pre>
<p>توفر حاوية حقن التبعيات ضمان «نسخة واحدة في كل مكان» نفسه، لكنها تتيح للاختبارات تسجيل ربط وهمي قبل الحل. هذا التغيير الواحد يتيح اختبارات وحدات معزولة بطريقة لا يستطيع نمط مفرد مصنوع يدويًا تحقيقها.</p>
<h3 id="سياق-react-لنطاق-شجرة-المكونات">سياق React لنطاق شجرة المكونات</h3>
<p>في React، تعني «العالمية» عادةً «متاح لكل مكون في هذه الشجرة». يتيح لك كل من <code>createContext</code> والمزود (Provider) تحديد ذلك، مع ميزة إضافية هي أن النطاق هو الشجرة الفرعية؛ يمكنك تركيب قيمة مختلفة في اختبار أو قصة Storybook دون المساس بشيفرة الإنتاج.</p>
<pre><code>const FeatureFlagsContext = createContext(null);

export function FeatureFlagsProvider({ client, children }) {
  return (
    &lt;FeatureFlagsContext.Provider value={client}&gt;
      {children}
    &lt;/FeatureFlagsContext.Provider&gt;
  );
}

export function useFeatureFlag(name) {
  const client = useContext(FeatureFlagsContext);
  return client.isEnabled(name);
}
</code></pre>
<h3 id="المخازن-الخفيفة-zustand-وjotai-وvaltio">المخازن الخفيفة: Zustand وJotai وValtio</h3>
<p>للحالة على مستوى التطبيق مع الاشتراكات، حلّت المخازن الحديثة إلى حد كبير محل الأنماط المفردة العشوائية. فمخزن Zustand، على سبيل المثال، دالة — لا صنف — تعيد خطّافًا مرتبطًا بحالة واحدة:</p>
<pre><code>import { create } from &quot;zustand&quot;;

export const useSession = create((set) =&gt; ({
  user: null,
  login: (user) =&gt; set({ user }),
  logout: () =&gt; set({ user: null }),
}));
</code></pre>
<p>يستطيع أي مكون قراءة الجلسة أو تحديثها من دون مزود أو استدعاء <code>getInstance</code>، كما يمكن محاكاة المخزن بسهولة في الاختبارات.</p>
<h2 id="المزايا-والتكاليف">المزايا والتكاليف</h2>
<h3 id="الاختبارات-هي-الجزء-الصعب">الاختبارات هي الجزء الصعب</h3>
<p>يحتفظ النمط المفرد بالحالة عبر الاختبارات بحكم تعريفه. إذا غيّر الاختبار A علمًا وقرأه الاختبار B، فقد ربطت اختباراتك معًا من خلال حالة عالمية خفية — ونمط الفشل هنا هو تذبذب يعتمد على ترتيب التنفيذ ويصعب تشخيصه بشدة. تشمل التخفيفات ما يلي:</p>
<ul>
<li>وفر دالة <code>reset()</code> وابداها في <code>beforeEach</code>.</li>
<li>احقن النسخة المفردة عبر وسيط في الدالة المنشئة أو مصنع، كي تتمكن الاختبارات من تمرير نسخة جديدة.</li>
<li>استخدم إعادة تعيين الوحدات في Vitest أو Jest (<code>vi.resetModules()</code> / <code>jest.resetModules()</code>) — لكن انتبه إلى أنها تعمل بسلاسة مع الحالة الموجودة في نطاق الوحدة، لا مع الأصناف التي تحتفظ بمرجع ساكن خاص بها.</li>
</ul>
<h3 id="الاقتران-المخفي">الاقتران المخفي</h3>
<p>الدالة التي تستدعي <code>Logger.getInstance()</code> في أعماق جسمها تملك تبعية لا تظهر في توقيعها. وبعد شهرين، عندما يحاول أحدهم استخدام الدالة في سياق مختلف، يكتشف الاقتران بالطريقة الصعبة. الأفضل تمرير التبعية صراحةً:</p>
<pre><code>// Hidden dependency
function processOrder(order) {
  Logger.getInstance().info(&quot;processing&quot;, order.id);
}

// Explicit — the contract is in the signature
function processOrder(order, logger) {
  logger.info(&quot;processing&quot;, order.id);
}
</code></pre>
<h3 id="تسرب-الحالة-على-الخادم">تسرّب الحالة على الخادم</h3>
<p>في عملية Node طويلة العمر تخدم طلبات كثيرة، تتشارك ذاكرة مؤقتة أو عداد على مستوى الوحدة عبر الطلبات. هذا مقبول للأدوات عديمة الحالة مثل مسجل مضبوط، لكنه كارثي لأي شيء ينبغي أن يكون خاصًا بكل طلب. توثق أطر مثل Next.js صراحةً أي الأنماط المفردة آمنة عبر الطلبات وأيها يحتاج إلى نطاق عبر <code>AsyncLocalStorage</code> أو ذاكرة React المؤقتة الخاصة بكل طلب.</p>
<h3 id="الوراثة-والتهيئة-الكسولة">الوراثة والتهيئة الكسولة</h3>
<p>تجعل تطبيقات النمط المفرد الكلاسيكي الوراثة محرجة — إذ يعيد الصنف الأب نسخته المخزنة بدلًا من إنشاء الصنف الفرعي. إذا كنت تحتاج حقًا إلى مصنع متعدد الأشكال («أعطني تنفيذ العميل المناسب»)، فذلك نمط مصنع (factory)، لا نمط مفرد.</p>
<h2 id="النمط-المفرد-مقابل-الحالة-في-نطاق-الوحدة-مقابل-الحالة-العالمية">النمط المفرد مقابل الحالة في نطاق الوحدة مقابل الحالة العالمية</h2>
<table>
<thead>
<tr>
<th></th>
<th>صنف المفرد</th>
<th>الحالة في نطاق الوحدة</th>
<th>متغير عالمي</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>نسخة واحدة لكل نطاق واقع</strong></td>
<td>نعم (مفروض)</td>
<td>نعم (ضمان ESM)</td>
<td>نعم</td>
</tr>
<tr>
<td><strong>التغليف</strong></td>
<td>قوي (حقول خاصة)</td>
<td>قوي (نطاق الوحدة)</td>
<td>لا شيء</td>
</tr>
<tr>
<td><strong>التهيئة الكسولة</strong></td>
<td>نعم</td>
<td>نعم (<code>await</code> على المستوى الأعلى)</td>
<td>لا</td>
</tr>
<tr>
<td><strong>قابل للاكتشاف في الاستيرادات</strong></td>
<td>نعم</td>
<td>نعم</td>
<td>لا (يُتاح عبر <code>window</code> / <code>globalThis</code>)</td>
</tr>
<tr>
<td><strong>قابل للاختبار بمعزل</strong></td>
<td>صعب</td>
<td>متوسط (إعادة تعيين الوحدة)</td>
<td>صعب</td>
</tr>
<tr>
<td><strong>الوراثة / تعدد الأشكال</strong></td>
<td>نعم</td>
<td>لا</td>
<td>لا</td>
</tr>
</tbody>
</table>
<p>الخلاصة: إذا كنت لا تحتاج ميزات الصنف، فالوحدة هي الإجابة الأبسط. وإذا كنت تحتاج إليها، فابنِ النمط المفرد على <code>#instance</code> وواصف ثابت — واحقنه عبر جذر تركيب التطبيق كي تتمكن الاختبارات من استبداله.</p>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules">وحدات JavaScript — MDN</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties">ميزات الأصناف الخاصة — MDN</a></li>
<li><a href="https://github.com/microsoft/tsyringe">tsyringe — Microsoft</a></li>
<li><a href="https://github.com/pmndrs/zustand">Zustand</a></li>
<li><a href="https://refactoring.guru/design-patterns/singleton">نمط المفرد — Refactoring Guru</a></li>
</ul>
`,a={book:t,chapter:n,chapterTitle:e,slug:o,title:r,headings:d,html:s};export{t as book,n as chapter,e as chapterTitle,a as default,d as headings,s as html,o as slug,r as title};
