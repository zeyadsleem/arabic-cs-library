const e="patterns-dev",t="react",n="أنماط React وNext.js",o="streaming-ssr",r="البث مع العرض في جانب الخادم",d=[{depth:2,id:"واجهتا-البث-في-react-18",text:"واجهتا البث في React 18+"},{depth:2,id:"البث-على-node-باستخدام-rendertopipeablestream",text:"البث على Node باستخدام renderToPipeableStream"},{depth:2,id:"onshellready-مقابل-onallready",text:"onShellReady مقابل onAllReady"},{depth:2,id:"البث-على-الحافة-edge-باستخدام-rendertoreadablestream",text:"البث على الحافة (edge) باستخدام renderToReadableStream"},{depth:2,id:"الترطيب-مع-البث",text:"الترطيب مع البث"},{depth:2,id:"حدود-الأخطاء-ليست-اختيارية-مع-البث",text:"حدود الأخطاء ليست اختيارية مع البث"},{depth:2,id:"البث-في-nextjs",text:"البث في Next.js"},{depth:2,id:"تكلفة-البث",text:"تكلفة البث"},{depth:2,id:"متى-يكون-ssr-بالبث-الخيار-الصحيح",text:"متى يكون SSR بالبث الخيار الصحيح"}],a=`<p>للعرض في جانب الخادم (server-side rendering، SSR) الكلاسيكي مشكلة حجز للاستجابة (buffering). ينفذ الخادم العرض كاملًا — بما في ذلك كل عملية جلب بيانات غير متزامنة تحتاجها الصفحة — ولا يكتب استجابة HTML واحدة إلا بعدها. إذا استغرق أبطأ جلب في الصفحة 800 مللي ثانية، سينتظر المستخدم 800 مللي ثانية على الأقل قبل رسم <em>أي</em> محتوى. إذ تحتجز أسرع أجزاء الصفحة رهينة لأبطئها.</p>
<p>يعالج SSR بالبث (streaming SSR) ذلك بالسماح لـ React بإرسال HTML إلى المتصفح فور توفّره. يُرسل الهيكل (shell)، أي الترويسة والتنقل وواجهة التخطيط وكل ما لا يعتمد على بيانات غير متزامنة، فورًا. أما الأجزاء البطيئة — المغلّفة بـ \`\` — فتُبث لاحقًا كقطع ضمن استجابة HTTP نفسها، ويحل كل جزء محل بديل احتياطي (fallback) كان ظاهرًا مسبقًا.</p>
<p>يبدأ المتصفح التحليل فور وصول البايتات. ينخفض TTFB لأن الخادم لا ينتظر. وينخفض LCP عادةً لأن المحتوى الرئيسي موجود في المقطع الأول. يرى المستخدم حركة — تتحول العناصر النائبة إلى محتوى حقيقي — بدلًا من التحديق في علامة تبويب فارغة.</p>
<h2 id="واجهتا-البث-في-react-18">واجهتا البث في React 18+</h2>
<p>أعادت React 18 تصميم واجهات الخادم حول البث. وهناك واجهتان حسب بيئة التشغيل:</p>
<ul>
<li><strong><code>renderToPipeableStream</code></strong> — لـ Node.js. تُعيد تدفقًا قابلًا للتوجيه (Pipeable stream) تستدعي <code>pipe()</code> لإرساله في الاستجابة. وتستخدم الاستدعاءات <code>onShellReady</code> و<code>onAllReady</code> و<code>onError</code>.</li>
<li><strong><code>renderToReadableStream</code></strong> — لبيئات Web/Edge مثل Cloudflare Workers وVercel Edge وDeno وBun. تُعيد <code>Promise</code> تحتوي على <code>ReadableStream</code> من Web يمكنك إعادته بوصفه جسم الاستجابة.</li>
</ul>
<p>أُزيلت <code>renderToNodeStream</code> الأقدم في React 19. إذا كنت تصون خادمًا ما زال يستخدمها، فهذه هي عملية الانتقال المطلوبة؛ لأنها لا تدعم \`\` أو أيًا من ضمانات البث الموضحة أدناه.</p>
<h2 id="البث-على-node-باستخدام-rendertopipeablestream">البث على Node باستخدام <code>renderToPipeableStream</code></h2>
<p>إليك إعدادًا كاملًا لـ SSR بالبث في صفحة لوحة معلومات تحليلية. يُعرض الهيكل فورًا، بينما يعلّق كل من الرسم البياني وخلاصة النشاط الأخير تنفيذه على عمليات الجلب الخاصة به ويُبث كل منهما بصورة مستقلة.</p>
<pre><code>// server.jsx
import express from &quot;express&quot;;
import { renderToPipeableStream } from &quot;react-dom/server&quot;;
import Dashboard from &quot;./Dashboard&quot;;\\n
const app = express();\\n
app.get(&quot;/&quot;, (req, res) =&gt; {
  let didError = false;\\n
  const { pipe, abort } = renderToPipeableStream(&lt;Dashboard /&gt;, {
    bootstrapModules: [&quot;/static/client.js&quot;],
    onShellReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader(&quot;Content-Type&quot;, &quot;text/html&quot;);
      pipe(res);
    },
    onShellError(error) {
      res.statusCode = 500;
      res.setHeader(&quot;Content-Type&quot;, &quot;text/html&quot;);
      res.send(&quot;&lt;h1&gt;Dashboard unavailable&lt;/h1&gt;&quot;);
    },
    onError(error) {
      didError = true;
      console.error(error);
    },
  });\\n
  // Drop the connection if a client hangs for too long.
  setTimeout(abort, 10_000);
});\\n
app.listen(3000);
</code></pre>
<p>وها هي الصفحة نفسها، مع اعتمادَي بيانات يعلّقان التنفيذ:</p>
<pre><code>// Dashboard.jsx
import { Suspense } from &quot;react&quot;;
import ChartCard from &quot;./ChartCard&quot;;
import ActivityFeed from &quot;./ActivityFeed&quot;;\\n
export default function Dashboard() {
  return (
    &lt;html&gt;
      &lt;body&gt;
        &lt;header&gt;
          &lt;h1&gt;Analytics&lt;/h1&gt;
          &lt;nav&gt;{/* always-fast nav */}&lt;/nav&gt;
        &lt;/header&gt;\\n
        &lt;Suspense fallback={&lt;ChartCardSkeleton /&gt;}&gt;
          &lt;ChartCard /&gt; {/* fetches a slow time series */}
        &lt;/Suspense&gt;\\n
        &lt;Suspense fallback={&lt;ActivityFeedSkeleton /&gt;}&gt;
          &lt;ActivityFeed /&gt; {/* fetches the last 50 events */}
        &lt;/Suspense&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}
</code></pre>
<p>ما يراه المتصفح، بالترتيب:</p>
<ul>
<li><strong>الهيكل</strong>، أي HTML والترويسة والتنقل وهيكلَي التحميل — يُرسل عند إطلاق <code>onShellReady</code>.</li>
<li><strong>أيهما ينتهي أولًا من البيانات</strong> — يُبث HTML الخاص به مع سكربت مضمّن يستبدل الهيكل المقابل.</li>
<li><strong>الآخر</strong>، عند جاهزيته.</li>
</ul>
<p>إذا حُلّت خلاصة النشاط خلال 80 مللي ثانية والرسم البياني خلال 600 مللي ثانية، فسيرى المستخدم خلاصة النشاط عند 80 مللي ثانية بدلًا من انتظار 600 كاملة. بدت الصفحة أسرع سبع مرات.</p>
<h2 id="onshellready-مقابل-onallready"><code>onShellReady</code> مقابل <code>onAllReady</code></h2>
<p>تمثل الاستدعاءان نوايا مختلفة جوهريًا:</p>
<ul>
<li><strong><code>onShellReady</code></strong> يُطلق في اللحظة التي يصبح فيها كل ما هو <em>خارج</em> حدود \`\` قابلًا للعرض. وهذا هو الخيار الذي تريده للمستخدمين؛ أرسل الهيكل في أقرب وقت ممكن ودع البقية تبث.</li>
<li><strong><code>onAllReady</code></strong> لا يُطلق إلا عند عرض الشجرة كاملة، بما في ذلك محتوى كل حدود \`\`. استخدمه مع العملاء الذين لا يستطيعون معالجة التحديثات المبثوطة أو لا يريدون ذلك، مثل بعض زواحف البحث وعرض البريد الإلكتروني وأدوات جلب معاينات بطاقات التواصل ومصدّرات RSS.</li>
</ul>
<p>النمط الشائع هو اكتشاف <code>user-agent</code> واختيار الاستدعاء المناسب:</p>
<pre><code>const isCrawler = /bot|crawler|spider|crawling/i.test(req.headers[&quot;user-agent&quot;] || &quot;&quot;);\\n
const { pipe } = renderToPipeableStream(&lt;App /&gt;, {
  bootstrapModules: [&quot;/static/client.js&quot;],
  [isCrawler ? &quot;onAllReady&quot; : &quot;onShellReady&quot;]() {
    res.statusCode = didError ? 500 : 200;
    res.setHeader(&quot;Content-Type&quot;, &quot;text/html&quot;);
    pipe(res);
  },
  onError(err) {
    didError = true;
    console.error(err);
  },
});
</code></pre>
<h2 id="البث-على-الحافة-edge-باستخدام-rendertoreadablestream">البث على الحافة (edge) باستخدام <code>renderToReadableStream</code></h2>
<p>لا تملك بيئات الحافة تدفقات Node؛ بل تستخدم <code>Web Streams</code>. الشكل مشابه، لكن الواجهة قائمة على <code>Promise</code>:</p>
<pre><code>// edge-handler.jsx
import { renderToReadableStream } from &quot;react-dom/server&quot;;
import App from &quot;./App&quot;;\\n
export default {
  async fetch(request) {
    let didError = false;\\n
    const stream = await renderToReadableStream(&lt;App /&gt;, {
      bootstrapModules: [&quot;/static/client.js&quot;],
      onError(err) {
        didError = true;
        console.error(err);
      },
    });\\n
    // Wait for the shell before responding — analogous to onShellReady.
    await stream.allReady; // omit this to flush as early as possible
    // Or, for crawlers, wait for the whole tree:
    // await stream.allReady;\\n
    return new Response(stream, {
      status: didError ? 500 : 200,
      headers: { &quot;content-type&quot;: &quot;text/html&quot; },
    });
  },
};
</code></pre>
<p>تُحل Promise التي تعيدها <code>renderToReadableStream</code> فور جاهزية الهيكل. أما التدفق نفسه فيملك Promise اسمها <code>allReady</code> يمكنك انتظارها متى احتجت الشجرة كاملة، كما في حالة زاحف البحث. وإذا لم تنتظر أي شيء بعد Promise الأولية، يبدأ بث الاستجابة فورًا.</p>
<h2 id="الترطيب-مع-البث">الترطيب مع البث</h2>
<p>الترطيب في عالم البث هو نظير العرض: فور وصول كل مقطع، يطابق React في العميل عقد DOM الجديدة بشيفرة المكوّنات ويربط مستمعي أحداثها. وهذه هي <strong>الترطيب الانتقائي (selective hydration)</strong>، ولها خاصيتان مهمتان:</p>
<ul>
<li><strong>يتم الترطيب على شكل مقاطع.</strong> تُرطَّب حدود \`\` بصورة مستقلة عن بقية الصفحة. فيستطيع المستخدم التفاعل مع التنقل بينما لا يزال الرسم البياني قيد التحميل.</li>
<li><strong>تفوق إدخال المستخدم.</strong> إذا ضغط المستخدم زرًا في منطقة لم تُرطَّب بعد، فإن React يعطي أولوية لترطيب <em>تلك</em> المنطقة أولًا. ويمنع الترطيب الانتقائي أسوأ أشكال الوادي الغريب، حيث تضيع نقرة بصمت لأن الترطيب كان مشغولًا في مكان آخر.</li>
</ul>
<p>في جانب العميل، استخدم <code>hydrateRoot</code>:</p>
<pre><code>// client.jsx
import { hydrateRoot } from &quot;react-dom/client&quot;;
import App from &quot;./App&quot;;\\n
hydrateRoot(document, &lt;App /&gt;);
</code></pre>
<p>أُزيلت <code>ReactDOM.hydrate</code> في React 19. إذا ما زلت تستخدمها، فالتبديل إلى <code>hydrateRoot</code> هو مسار الترقية.</p>
<h2 id="حدود-الأخطاء-ليست-اختيارية-مع-البث">حدود الأخطاء ليست اختيارية مع البث</h2>
<p>بعد إرسال الهيكل، لا يستطيع خطأ في مكوّن أعمق تغيير رمز حالة HTTP. الخيارات المتاحة هي فقط: (أ) استبدال المنطقة المتأثرة بديل احتياطي في التدفق، أو (ب) ترك React تفككها في العميل أثناء الترطيب. ويتطلب الخياران Error Boundary.</p>
<pre><code>&lt;ErrorBoundary fallback={&lt;p&gt;Could not load reviews.&lt;/p&gt;}&gt;
  &lt;Suspense fallback={&lt;ReviewSkeleton /&gt;}&gt;
    &lt;Reviews productId={id} /&gt;
  &lt;/Suspense&gt;
&lt;/ErrorBoundary&gt;
</code></pre>
<p>النمط هو: لُف كل منطقة مبثوطة داخل <em>حد أخطاء</em> وحد Suspense معًا. يتولى حد Suspense حالة «ما زال قيد التحميل»، ويتولى حد الأخطاء حالة «اكتمل التحميل لكن فشل».</p>
<p>لاسترجاع الأخطاء بأمان، خصّص <code>onError</code> في <code>renderToPipeableStream</code> مكان التسجيل؛ أما حد الأخطاء فهو المكان الذي تعرض فيه واجهة بديلة.</p>
<h2 id="البث-في-nextjs">البث في Next.js</h2>
<p>يتولى App Router كل ذلك نيابةً عنك. يتحول أي ملف <code>loading.tsx</code> في مقطع مسار تلقائيًا إلى حد \`\`، وأي مكوّن خادمي غير متزامن يعلّق التنفيذ يُبث عند حل بياناته.</p>
<pre><code>app/dashboard/
  layout.tsx       &lt;-- always renders, flushed first
  loading.tsx      &lt;-- Suspense fallback for the page
  page.tsx         &lt;-- async, can fetch data
  @analytics/
    loading.tsx
    page.tsx       &lt;-- parallel route, streams independently
  error.tsx        &lt;-- error boundary
</code></pre>
<p>لا تكتب <code>renderToPipeableStream</code> مباشرة؛ فـ Next.js تستدعيه، أو تكافئه على الحافة، نيابةً عنك وتربط البث وفق اصطلاحات الملفات هذه. وتكون النتيجة هي نفسها: يُرسل التخطيط الساكن فورًا، وتُبث البيانات البطيئة، ويتولى الترطيب الانتقائي التفاعلية.</p>
<h2 id="تكلفة-البث">تكلفة البث</h2>
<p>البث ليس مجانيًا. وفيما يلي بعض الأمور التي ينبغي الانتباه إليها:</p>
<ul>
<li><strong>لا يمكنك تغيير ترويسات الاستجابة بعد المقطع الأول.</strong> رمز الحالة و<code>Set-Cookie</code> وإعادة التوجيه وترويسات الأمان — تتخذ كلها قراراتها قبل الإرسال الأول. إذا كان مكوّن أعمق سيؤدي إلى 404، فيمكنك عرض رسالة خطأ داخل البث، لكن رمز حالة الاستجابة يثبت عند 200.</li>
<li><strong>تتعطل بعض البرمجيات الوسيطة.</strong> أي شيء يجمع الاستجابة كاملة، كضغط被执行 بصورة خاطئة أو إعدادات معينة لـ WAF أو CDN، يبطل البث كليًا. تحقق باستخدام <code>curl</code> وراقب أن <code>Transfer-Encoding: chunked</code> يتصرف فعليًا كتدفق.</li>
<li><strong>يبدو TTFB أقل من التجربة الفعلية.</strong> تصل البايتة الأولى سريعًا، لكنها قد تكون الهيكل وحده. قارن SSR بالبث بـ SSR من دون بث عبر LCP وINP، لا TTFB وحده.</li>
<li><strong>يغير Suspense أنماط جلب البيانات.</strong> يجب أن يستخدم المكوّن الذي يعلّق التنفيذ طبقة بيانات متوافقة مع Suspense، إما hook <code>use()</code> في React، أو وسيط إطار عمل مثل <code>fetch</code> في Next.js و<code>useLoaderData</code> في Remix، أو مكتبة تتكيف مثل <code>useSuspenseQuery</code> في TanStack Query. ولا يعلّق <code>useEffect</code> العادي التنفيذ.</li>
</ul>
<h2 id="متى-يكون-ssr-بالبث-الخيار-الصحيح">متى يكون SSR بالبث الخيار الصحيح</h2>
<table>
<thead>
<tr>
<th>ملف الصفحة</th>
<th>هل تستخدم SSR بالبث؟</th>
</tr>
</thead>
<tbody>
<tr>
<td>لوحة معلومات تضم عدة عمليات جلب بطيئة</td>
<td>نعم — أكبر مكسب.</td>
</tr>
<tr>
<td>صفحة تسويق وكل بياناتها ساكنة</td>
<td>لا — استخدم SSG أو PPR.</td>
</tr>
<tr>
<td>صفحة محمية بالمصادقة وتضم عملية جلب سريعة واحدة</td>
<td>اختياري — المكاسب صغيرة إذا لم يكن هناك ما يتداخل زمنيًا.</td>
</tr>
<tr>
<td>تحديثات بيانات مباشرة وآنية</td>
<td>يتولى SSR بالبث الرسم الأولي؛ استخدم WebSocket أو SSE للتحديثات المستمرة.</td>
</tr>
<tr>
<td>صفحات تحتاج زواحف البحث إلى عرضها كاملة</td>
<td>نعم، لكن استخدم <code>onAllReady</code> لهذا النوع من العملاء.</td>
</tr>
</tbody>
</table>
<p>ينسجم SSR بالبث بصفة خاصة مع <strong>العرض الجزئي المسبق (Partial Prerendering)</strong>، حيث يُبث هيكل ساكن قبل بدء أي عمل ديناميكي، ومع <strong>مكوّنات React الخادمية (React Server Components)</strong>، التي تستطيع تنفيذ جلب بياناتها في الخادم من دون المساهمة في حزمة العميل. ويبدأ النمط التالي في هذه السلسلة، <strong>الترطيب التدريجي (Progressive Hydration)</strong>، من حيث يتوقف SSR بالبث — في حل مسألة <em>كم</em> من JavaScript ينبغي إرساله كي تصبح الصفحة تفاعلية، لا مجرد كيفية رسم HTML لها.</p>
`,s={book:e,chapter:t,chapterTitle:n,slug:o,title:r,headings:d,html:a};export{e as book,t as chapter,n as chapterTitle,s as default,d as headings,a as html,o as slug,r as title};
