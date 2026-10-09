const n="ahastack",t="example-first",a="مثال أوّل",s="index",e="مثال أوّل",p=[],o=`<p>دعني أعمل مثالًا بسيطًا جدًا باستخدام Astro و htmx. لا يستخدم هذا المثال Alpine؛ سنضيفه في <a href="/arabic-cs-library/book/ahastack/example-alpine/index">المثال التالي</a>.</p>
<p>أريد أن أبيع لك Astro و htmx أوّلًا.</p>
<p>سنحصل على صفحة فيها زرّان: واحد لزيادة عدّاد، والآخر لإنقاص القيمة.</p>
<p>شاهد هذا الشيء وهو يعمل على <a href="https://demo.ahastack.dev/counter">https://demo.ahastack.dev/counter</a>. يعمل على Cloudflare Workers، وتُخزَّن القيمة في قاعدة بيانات D1 (وهي SQLite الخاصة بـ Cloudflare).</p>
<p>الشيفرة الكاملة على GitHub: <a href="https://github.com/flaviocopes/ahastack.dev/tree/main/demo">https://github.com/flaviocopes/ahastack.dev/tree/main/demo</a>. يستضيف ذلك المستودع <a href="https://demo.ahastack.dev">18 عرضًا توضيحيًا</a> على Worker واحد، لذا تقع الملفات في <code>src/pages/counter.astro</code> و<code>src/pages/api/counter/</code>، وتستخدم الصفحات تخطيطًا مشتركًا للتنسيق. والمنطق هو نفسه الذي سيأتي أدناه.</p>
<p>أظنّ أن هذا سيُظهر مدى بساطة هذه الحزمة (stack).</p>
<p>ثبّت Astro</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh">npm create astro@latest
</code></pre>
<p><img src="/arabic-cs-library/images/ahastack/example-first-0-Screenshot-2024-01-03T10.04.51AM.hUp_C0W4_1fv4MY.webp" alt=""></p>
<p>شغّل الموقع وافتحه في VS Code</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> &lt;project&gt;
code .
npm run dev
</code></pre>
<p>code .npm run dev&quot;&gt;</p>
<p>يُنتج Astro HTML ثابتًا وقت البناء افتراضيًا. عدّادنا يتغيّر مع كل نقرة، لذا نحتاج إلى أن يُعرِض Astro الصفحات على الخادم (server-rendered) وقت الطلب.</p>
<p>سننشر إلى Cloudflare، لذا نضيف مُحوِّل Cloudflare:</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh">npx astro add cloudflare
</code></pre>
<p>ثم فعّل العرض على الخادم في <code>astro.config.mjs</code>:</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;astro/config&#x27;</span>
<span class="hljs-keyword">import</span> cloudflare <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@astrojs/cloudflare&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">output</span>: <span class="hljs-string">&#x27;server&#x27;</span>,
  <span class="hljs-attr">adapter</span>: <span class="hljs-title function_">cloudflare</span>(),
})
</code></pre>
<p>الآن نحتاج إلى مكان لتخزين القيمة.</p>
<p>لا تملك Cloudflare Workers نظام ملفات، لذا نستخدم D1، وهي قاعدة بيانات SQLite من Cloudflare. أنشئ واحدة:</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh">npx wrangler d1 create aha-counter
</code></pre>
<p>يطبع Wrangler مُعرِّف قاعدة البيانات. أنشئ ملف <code>wrangler.jsonc</code> في جذر المشروع وأضف الربط (binding) مع مُعرِّفك:</p>
<pre><code class="language-jsonc"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;aha-counter&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;d1_databases&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;binding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DB&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;database_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;aha-counter&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;database_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&lt;your database id&gt;&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>&quot;  } ]}&quot;&gt;</p>
<p>أنشئ ملف <code>schema.sql</code> فيه جدول واحد وصفّ واحد:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> IF <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">EXISTS</span> counter (id <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">PRIMARY KEY</span>, <span class="hljs-keyword">value</span> <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NOT NULL</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">OR</span> IGNORE <span class="hljs-keyword">INTO</span> counter (id, <span class="hljs-keyword">value</span>) <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">1</span>, <span class="hljs-number">0</span>);
</code></pre>
<p>نفّذه على قاعدة البيانات المحلية (التي يستخدمها <code>npm run dev</code>) وعلى البعيدة (التي تُستخدم في الإنتاج):</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh">npx wrangler d1 execute aha-counter --<span class="hljs-built_in">local</span> --file ./schema.sql
npx wrangler d1 execute aha-counter --remote --file ./schema.sql
</code></pre>
<p>هذا كل الإعداد. الآن أنشئ <code>src/pages/index.astro</code>.</p>
<p>اكتب شيفرة على الخادم تقرأ القيمة من قاعدة البيانات وتضيفها إلى HTML:</p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

const count = await env.DB.prepare('SELECT value FROM counter WHERE id = 1')
  .first('value')
---

&lt;html lang='en'&gt;
  &lt;head&gt;
    &lt;meta charset='utf-8' /&gt;
    &lt;meta name='viewport' content='width=device-width' /&gt;
    &lt;title&gt;AHA counter&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Count: {count}&lt;/h1&gt;
  &lt;/body&gt;

</code></pre>
<p>AHA counter</p>
<h1>العدّ: {count}</h1>
<p>&quot;&gt;</p>
<p>النتيجة في المتصفح حتى الآن:</p>
<p><img src="/arabic-cs-library/images/ahastack/example-first-1-Screenshot-2024-01-03T10.51.57AM.Duok8QBx_2dLwX6.webp" alt=""></p>
<p>في Astro، الجزء الواقع بين <code>---</code> في الأعلى يُنفَّذ على الخادم، والجزء الذي تحته هو HTML الذي يُعاد إلى جهة العميل.</p>
<p><code>env.DB</code> هو ربط D1 الذي صرّحنا به في <code>wrangler.jsonc</code>. ويشغّل Astro خادم التطوير داخل بيئة تشغيل Cloudflare الحقيقية، لذا يعمل هذا محليًا أيضًا.</p>
<p>لنثبّت الآن htmx.</p>
<p>أضف هذا الوسم <code>إلى</code> في HTML الذي يُعيده <code>index.astro</code>:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.jsdelivr.net/npm/htmx.org@4.0.0&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تم تثبيت htmx.</p>
<p>الآن يمكننا إنشاء الزرّين لزيادة القيمة أو إنقاصها:</p>
<pre><code class="language-astro">&lt;body&gt;
  &lt;h1&gt;Count: {count}&lt;/h1&gt;

  &lt;button hx-post=&quot;/api/increment&quot;&gt;Increment&lt;/button&gt;
  &lt;button hx-post=&quot;/api/decrement&quot;&gt;Decrement&lt;/button&gt;
&lt;/body&gt;
</code></pre>
<h1>العدّ: {count}</h1>
<p>Increment  Decrement&quot;&gt;</p>
<p><img src="/arabic-cs-library/images/ahastack/example-first-2-Screenshot-2024-01-03T10.52.59AM.B6vxtszX_zYXX.webp" alt=""></p>
<p>عندما تنقر زرّ Increment، يُصدر htmx طلب POST إلى <code>/api/increment</code>.</p>
<p>أنشئ <code>src/pages/api/increment.astro</code></p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value + 1 WHERE id = 1 RETURNING value'
).first('value')
---

{count}
</code></pre>
<p><code>export const partial = true</code> تخبر Astro أن هذا يُعيد «شظية HTML» (HTML fragment) بسيطة، لا صفحة كاملة.</p>
<p>استعلام SQL يُجري الزيادة ويُعيد القيمة الجديدة في استعلام ذرّي واحد، لذا لا يستطيع شخصان ينقران في اللحظة نفسها أن يتداخلا مع بعضهما.</p>
<p>أصبح النقر على الزر يُعيد القيمة الجديدة داخل الزر، لأن htmx يستبدل افتراضيًا الـ HTML المُعاد مكان <code>innerHTML</code> للعنصر الذي أطلق طلب الشبكة.</p>
<p><img src="/arabic-cs-library/images/ahastack/example-first-3-Screenshot-2024-01-03T10.28.21AM.SaAhSXe1_Z1xmHNG.webp" alt=""></p>
<p>يمكنك تغيير HTML إلى</p>
<pre><code class="language-astro">&lt;body&gt;
  &lt;h1&gt;
    Count: &lt;span id='count'&gt;{count}&lt;/span&gt;
  &lt;/h1&gt;

  &lt;button hx-post='/api/increment' hx-target='#count'&gt;
    Increment
  &lt;/button&gt;
  &lt;button hx-post='/api/decrement' hx-target='#count'&gt;
    Decrement
  &lt;/button&gt;
&lt;/body&gt;
</code></pre>
<h1>العدّ: {count}</h1>
<pre><code> Increment     Decrement  &quot;&gt;
</code></pre>
<p>والآن تُحدَّث قيمة العدّاد ديناميكيًا.</p>
<p>انقر الزرّ، وسترى القيمة تزداد بشكل صحيح:</p>
<p><img src="/arabic-cs-library/images/ahastack/example-first-4-Screenshot-2024-01-03T10.24.10AM.BGAJNPYI_1QdSDx.webp" alt=""></p>
<p>لاحظ أننا أرسلنا HTML (في هذه الحالة، أرجعنا رقمًا فحسب، لكنه يُعاد بنوع MIME من نوع <code>text/html</code>، لا بصيغة أخرى مثل JSON مثلًا) إلى جهة العميل، وأن هذا HTML يُستبدل في الصفحة في الموضع الذي نريده تمامًا.</p>
<p>كما ننشئ «نداء الـ API» (API call) لإنقاص القيمة في <code>src/pages/api/decrement.astro</code></p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value - 1 WHERE id = 1 RETURNING value'
).first('value')
---

{count}
</code></pre>
<p>كل تحديثات القيمة تحدث دون إعادة تحميل كاملة للصفحة، ودون أن نكتب <em>أي</em> شيفرة JavaScript بأنفسنا، ودون إطار «تطبيق صفحة واحدة» (SPA).</p>
<p>في لوحة الشبكة (network) في أدوات مطوّر المتصفح يمكنك رؤية كل الطلبات التي لا تُعيد سوى أجزاء من HTML.</p>
<p><img src="/arabic-cs-library/images/ahastack/example-first-5-Screenshot-2024-01-03T10.45.25AM.BESsjwtr_2cw3pv.webp" alt=""></p>
<p><img src="/arabic-cs-library/images/ahastack/example-first-6-Screenshot-2024-01-03T10.47.24AM.CRiPpMpT_2kTquq.webp" alt=""></p>
<p>إعادة تحميل الصفحة تُظهر لك القيمة الحالية. الحالة كلها مُدارة على الخادم.</p>
<p>دعني أخبرك بمبدّلات oob (out-of-band) في htmx، لأن هذا سيُذهلك.</p>
<p>في HTML المُعاد من <code>/api/decrement</code> أو <code>/api/increment</code>، بدلًا من إرجاع <code>{count}</code> يمكنك إرجاع:</p>
<pre><code class="language-astro">&lt;span id='count' hx-swap-oob='true'&gt;{count}&lt;/span&gt;
</code></pre>
<p>{count}&quot;&gt;</p>
<p>ولن تعد بحاجة إلى وضع <code>hx-target='#count'</code> على الزرّين. فـ HTML الذي يُولَّد على الخادم هو ما يقرّر ما الذي يُستبدل.</p>
<p>عندما تحتوي الاستجابة على عناصر oob فقط، يترك htmx الزرّ وشأنه. لا يُستبدل شيء آخر.</p>
<p>الأمر المذهل أنه يمكنك أن يحتوي HTML المُعاد على عدة عناصر تحمل <code>hx-swap-oob='true'</code> فتحلّ محل أجزاء مختلفة من تطبيقك.</p>
<p>حان وقت النشر. ابنِ الموقع وادفعه إلى Cloudflare:</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh">npx astro build
npx wrangler deploy
</code></pre>
<p>يطبع Wrangler عنوان URL الخاص بـ Worker. هذا كل شيء، التطبيق منشور الآن.</p>
<p>لم يكن هذا سوى مثال صغير على استخدام Astro لتوليد HTML، وhtmx لقيادة التفاعل من جهة العميل إلى الخادم، في طريقة كنتَ ستظنّ أنك تحتاج فيها إلى إطار معقّد لتطبيق صفحة واحدة (SPA) وإلى كمّ هائل من شيفرة JavaScript، لكننا هنا لم نكتب سطرًا واحدًا من شيفرة JavaScript في جهة العميل (كنا قد كتبنا شيفرة JS في الواجهة الخلفية لقراءة القيمة وكتابتها، لكن هذه قصة أخرى).</p>
<p>لقد كنت أستخدم هذه الحزمة لبناء تطبيق أعقد بكثير، بشاشات كثيرة وتفاعل وتسجيل دخول وقاعدة بيانات، وهذا النهج يتوسّع إلى حدٍّ جيّد.</p>
<p>هل يمكن أن يناسب هذا حالتك أنت أيضًا؟ كما يقولون، هذا يعتمد. جرّبه في أمور صغيرة وشاهد بنفسك.</p>
<p>شيفرة التطبيق الكاملة:</p>
<p><code>src/pages/index.astro</code></p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

const count = await env.DB.prepare('SELECT value FROM counter WHERE id = 1')
  .first('value')
---

&lt;html lang='en'&gt;
  &lt;head&gt;
    &lt;meta charset='utf-8' /&gt;
    &lt;meta name='viewport' content='width=device-width' /&gt;
    &lt;title&gt;AHA counter&lt;/title&gt;
    &lt;script src='https://cdn.jsdelivr.net/npm/htmx.org@4.0.0'&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Count: &lt;span id='count'&gt;{count}&lt;/span&gt;&lt;/h1&gt;

    &lt;button hx-post='/api/increment'&gt;Increment&lt;/button&gt;
    &lt;button hx-post='/api/decrement'&gt;Decrement&lt;/button&gt;
  &lt;/body&gt;

</code></pre>
<p>AHA counter</p>
<h1>العدّ: {count}</h1>
<p>Increment  Decrement  &quot;&gt;</p>
<p><code>src/pages/api/increment.astro</code></p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value + 1 WHERE id = 1 RETURNING value'
).first('value')
---

&lt;span id='count' hx-swap-oob='true'&gt;{count}&lt;/span&gt;
</code></pre>
<p>{count}&quot;&gt;</p>
<p><code>src/pages/api/decrement.astro</code></p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value - 1 WHERE id = 1 RETURNING value'
).first('value')
---

&lt;span id='count' hx-swap-oob='true'&gt;{count}&lt;/span&gt;
</code></pre>
<p>{count}&quot;&gt;</p>
`,c={book:n,chapter:t,chapterTitle:a,slug:s,title:e,headings:p,html:o};export{n as book,t as chapter,a as chapterTitle,c as default,p as headings,o as html,s as slug,e as title};
