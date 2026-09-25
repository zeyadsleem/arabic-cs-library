const s="patterns-dev",n="react",e="أنماط React وNext.js",t="server-side-rendering",a="العرض في جانب الخادم",o=[{depth:2,id:"ما-الذي-يكسبك-إياه-العرض-في-جانب-الخادم",text:"ما الذي يكسبك إياه العرض في جانب الخادم"},{depth:2,id:"خط-عرض-في-جانب-الخادم-حديث-باستخدام-rendertopipeablestream",text:"خط عرض في جانب الخادم حديث باستخدام renderToPipeableStream"},{depth:2,id:"الترطيب-hydration-ولماذا-هو-الجزء-المكلف",text:"الترطيب (hydration)، ولماذا هو الجزء المكلف"},{depth:2,id:"العرض-في-جانب-الخادم-مع-nextjs-app-router",text:"العرض في جانب الخادم مع Next.js App Router"},{depth:2,id:"العرض-في-جانب-الخادم-على-الحافة-edge-ssr",text:"العرض في جانب الخادم على الحافة (Edge SSR)"},{depth:2,id:"متى-لا-تستخدم-العرض-في-جانب-الخادم",text:"متى لا تستخدم العرض في جانب الخادم"},{depth:2,id:"قائمة-تحقق-عملية",text:"قائمة تحقق عملية"}],r=`<p>العرض في جانب الخادم (Server-side rendering) يحوّل شجرة مكوّنات (component) React إلى HTML على الخادم (server) ويرسل ذلك HTML ضمن الاستجابة الأولية. يرسم المتصفح شيئًا ذا معنى قبل تحليل أي شيفرة JavaScript من التطبيق. وبعد وصول المستند، تعمل React مرة أخرى في جانب العميل (client) وتُطبّق الترطيب (hydration) على ترميز الصفحة — فترفق مستمعي الأحداث وتعيد ربط DOM بشجرة المكوّنات حتى يصبح تفاعليًا.</p>
<p>العرض في جانب الخادم هو الخيار الافتراضي المناسب عندما تعتمد محتويات الصفحة على الطلب — المستخدم المسجّل الدخول، أو كعكة (cookie)، أو مجموعة في اختبار A/B، أو ترويسة تحديد موقع جغرافي — <em>و</em> عندما تُقرأ الصفحة بكثرة تكفي لأن يستحق العرض لكل طلب تكلفته. صفحة تفاصيل منتج مخصّصة لمنطقة المشاهد، ولوحة تحكم تتطلب مصادقة، وصفحة نتائج بحث مُعامَلة بسلسلة الاستعلام (query string): هذه هي موطن العرض في جانب الخادم.</p>
<h2 id="ما-الذي-يكسبك-إياه-العرض-في-جانب-الخادم">ما الذي يكسبك إياه العرض في جانب الخادم</h2>
<table>
<thead>
<tr>
<th>الجانب</th>
<th>النتيجة مع العرض في جانب الخادم</th>
</tr>
</thead>
<tbody>
<tr>
<td>LCP في عمليات التحميل الباردة</td>
<td>أفضل — المحتوى الرئيسي موجود في HTML الأولي.</td>
</tr>
<tr>
<td>تحسين محركات البحث ومعاينات الروابط</td>
<td>ترى زواحف البحث ترميزًا مُعرضًا بالكامل، دون حاجة إلى تنفيذ JS.</td>
</tr>
<tr>
<td>التخصيص</td>
<td>أصلي — ترويسات الطلبات والكعكات وبيانات الجلسة متاحة وقت العرض.</td>
</tr>
<tr>
<td>TTFB</td>
<td>أبطأ من الثابت — العمل يحدث لكل طلب.</td>
</tr>
<tr>
<td>كلفة الخادم</td>
<td>أعلى من الثابت — كل طلب ينفّذ عملية العرض.</td>
</tr>
<tr>
<td>كلفة الترطيب (hydration)</td>
<td>حقيقية — لا يزال جانب العميل يحتاج إلى JS لجعل الواجهة تفاعلية.</td>
</tr>
</tbody>
</table>
<p>يُفهم العرض في جانب الخادم على أفضل نحو بوصفه مقايضة ضد <strong>العرض الثابت (static rendering)</strong> (TTFB أسرع، ودون عمل لكل طلب) وضد <strong>العرض في جانب العميل (CSR)</strong> (كلفة ترطيب أقل بكثير، وأول رسم أصغر حجماً).</p>
<h2 id="خط-عرض-في-جانب-الخادم-حديث-باستخدام-rendertopipeablestream">خط عرض في جانب الخادم حديث باستخدام <code>renderToPipeableStream</code></h2>
<p>استبدلت React 18 واجهات الخادم الأقدم المعتمدة على النصوص بمتغيّرات تعتمد على البث (streaming). على بيئات تشغيل Node تستخدم <code>renderToPipeableStream</code>؛ وعلى بيئات Web/Edge (Cloudflare Workers، Vercel Edge، Deno) تستخدم <code>renderToReadableStream</code>. كلاهما يدعم \`\` للبث الجزئي ويفتح ميزات React المتزامنة على الخادم.</p>
<p>الطرف المقابل في جانب العميل للعرض في جانب الخادم هو <code>hydrateRoot</code> (وليست <code>createRoot</code>، وليست <code>ReactDOM.hydrate</code> القديمة التي أُزيلت في React 19).</p>
<p>إليك خادم Express بسيطًا يعرض صفحة تفاصيل منتج:</p>
<p>JavaScript iconserver.jsxJavaScript iconclient.jsxJavaScript iconProductPage.jsx</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;express&quot;</span>;
<span class="hljs-keyword">import</span> { renderToPipeableStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom/server&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ProductPage</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ProductPage&quot;</span>;


<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&quot;/static&quot;</span>, express.<span class="hljs-title function_">static</span>(<span class="hljs-string">&quot;dist&quot;</span>));


app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;/products/:id&quot;</span>, <span class="hljs-title function_">async</span> (req, res) =&gt; {
  <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadProduct</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);


  <span class="hljs-keyword">let</span> didError = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">const</span> { pipe } = <span class="hljs-title function_">renderToPipeableStream</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductPage</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span></span>,
    {
      <span class="hljs-attr">bootstrapModules</span>: [<span class="hljs-string">&quot;/static/client.js&quot;</span>],
      <span class="hljs-title function_">onShellReady</span>(<span class="hljs-params"></span>) {
        res.<span class="hljs-property">statusCode</span> = didError ? <span class="hljs-number">500</span> : <span class="hljs-number">200</span>;
        res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;text/html&quot;</span>);
        <span class="hljs-title function_">pipe</span>(res);
      },
      <span class="hljs-title function_">onShellError</span>(<span class="hljs-params">err</span>) {
        res.<span class="hljs-property">statusCode</span> = <span class="hljs-number">500</span>;
        res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;text/html&quot;</span>);
        res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&quot;&lt;h1&gt;Something went wrong&lt;/h1&gt;&quot;</span>);
      },
      <span class="hljs-title function_">onError</span>(<span class="hljs-params">err</span>) {
        didError = <span class="hljs-literal">true</span>;
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(err);
      },
    }
  );
});


app.<span class="hljs-title function_">listen</span>(<span class="hljs-number">3000</span>);
</code></pre>
<p>هناك بعض التفاصيل التي تستحق إبرازها:</p>
<ul>
<li><strong><code>onShellReady</code></strong> يُطلق بمجرد أن يصبح الجزء <em>الخارج</em> لأي حدود من نوع \`\` قابلًا للعرض. فيُرسل الخادم ذلك الهيكل فورًا، فيبدأ المتصفح الرسم بينما تستمر البيانات الأبطأ في الوصول.</li>
<li><strong><code>onAllReady</code></strong> هو الاستدعاء البديل — انتظره بدلًا من ذلك عندما تحتاج إلى HTML الكامل (زواحف البحث التي لا تنفّذ السكربتات المتدفقة، وخلاصات RSS، وعرض البريد الإلكتروني).</li>
<li><strong><code>bootstrapModules</code></strong> تخبر React بأي السكربتات أن تحقنها، بحيث يبدأ الترطيب تلقائيًا عند وصول الهيكل.</li>
<li>يمكن لمكوّن <code>Reviews</code> أن يرمي Promise (عبر طبقة بيانات متوافقة مع Suspense). وعندما يُحلّ، تبثّ React قطعة HTML إضافية <em>مع</em> سكربت مضمّن يستبدل المحتوى الاحتياطي في موضعه. ولا حاجة إلى أي استطلاع (polling) في جانب العميل.</li>
</ul>
<h2 id="الترطيب-hydration-ولماذا-هو-الجزء-المكلف">الترطيب (hydration)، ولماذا هو الجزء المكلف</h2>
<p>الترطيب هو الخطوة التي تمشي فيها React فوق DOM المُعرض على الخادم، وتطابق كل عقدة مع شجرة المكوّنات، وترفق مستمعي الأحداث. وهو لا ينتج أي تغيير مرئي، لكنه يشغّل شجرة المكوّنات كاملةً مرة واحدة على الأقل — ولهذا فإن كلفة الترطيب تساوي تقريبًا كلفة أول عرض في جانب العميل.</p>
<p>هذا يخلق «وادي الغرابة» الخاص بالعرض في جانب الخادم: تبدو الصفحة جاهزة، لكن النقرات والمدخلات تُسقَط بصمت حتى يُحلَّل الحزمة ويكتمل الترطيب. والمقياس الذي تتابعه Google الآن لهذا الغرض هو <strong>التفاعل حتى الرسم التالي (Interaction to Next Paint, INP)</strong>، الذي حلّ محل FID في مؤشرات Core Web Vitals في مارس 2024.</p>
<p>ثلاثة أنماط تخفّض كلفة الترطيب:</p>
<ul>
<li><strong>البث من الخادم (streaming SSR) مع \`\`</strong> يتيح لأجزاء من الصفحة أن تُرطَّب عند وصول شيفرتها، بدلًا من الانتظار حتى الحزمة كاملة.</li>
<li><strong>الترطيب الانتقائي (Selective hydration)</strong> (المدمج في React 18+) يعطي الأولوية لترطيب المكوّن الذي يتفاعل معه المستخدم حاليًا.</li>
<li><strong>مكوّنات خادم React (React Server Components)</strong> تلغي الترطيب لأي مكوّن لا يحتاج إلى أن يكون تفاعليًا — فشيفرته لا تُرسَل أصلًا.</li>
</ul>
<h2 id="العرض-في-جانب-الخادم-مع-nextjs-app-router">العرض في جانب الخادم مع Next.js App Router</h2>
<p>في App Router، يكون العرض من الخادم هو الوضع الافتراضي ولا وجود لـ <code>getServerSideProps</code>. تصبح الصفحة ديناميكية — أي معروضة لكل طلب — فور قراءتها لبيانات وقت الطلب. وقراءة <code>cookies()</code> أو <code>headers()</code> أو <code>searchParams</code> تُدخل المسار تلقائيًا في العرض الديناميكي. (وفي Next.js 15 أصبحت هذه الواجهات غير متزامنة ويجب انتظارها.)</p>
<pre><code>// app/dashboard/page.tsx
import { cookies } from &quot;next/headers&quot;;\\n
export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get(&quot;session&quot;);\\n
  const user = await fetchUser(session?.value);
  const widgets = await fetchWidgets(user.id);\\n
  return (
    &lt;section&gt;
      &lt;h1&gt;Welcome back, {user.name}&lt;/h1&gt;
      &lt;WidgetGrid widgets={widgets} /&gt;
    &lt;/section&gt;
  );
}\`
</code></pre>
<p>وهناك أمور تغيّرت في Next.js 15 تؤثر على العرض في جانب الخادم تحديدًا:</p>
<ul>
<li>لم تعد استدعاءات <code>fetch()</code> <strong>مخزّنة مؤقتًا (cached) افتراضيًا</strong>. أنت تفعّل ذلك لكل طلب عبر <code>fetch(url, { cache: &quot;force-cache&quot; })</code> أو خيار <code>next.revalidate</code>. وهذا يجعل تمييز العرض من الخادم عن العرض الثابت أسهل في التفكير.</li>
<li>أصبحت <code>cookies()</code> و<code>headers()</code> و<code>draftMode()</code>، وكذلك <code>params</code>/<code>searchParams</code> الديناميكية، غير متزامنة ويجب انتظارها.</li>
<li>يتيح لك التوجيه الجديد <code>'use cache'</code> (تجريبي، خلف علم) وسم دالة أو مكوّن بأنه قابل للتخزين المؤقت (cacheable) بمعزل عن عمليات الجلب.</li>
</ul>
<h2 id="العرض-في-جانب-الخادم-على-الحافة-edge-ssr">العرض في جانب الخادم على الحافة (Edge SSR)</h2>
<p>تشغيل العرض في جانب الخادم على بيئة تشغيل حافة (Cloudflare Workers، Vercel Edge Functions، Deno Deploy) ينقل عملية العرض فعليًا إلى قرب المستخدم. ينخفض TTFB انخفاضًا حادًا — عادةً من 200–600 مللي ثانية على مصدر مركزي إلى 30–80 مللي ثانية عند الحافة — ويقترب زمن البدء البارد (cold start) في الحوسبة بلا خوادم من الصفر على المنصات الحديثة.</p>
<p>والمقايضات التي يجب وزنها:</p>
<ul>
<li>بيئة الحافة هي <strong>مجموعة جزئية من Node</strong> — لا وحدات أصلية (native modules)، ولا نظام ملفات، ودعم محدود لـ Buffer. استخدم <code>renderToReadableStream</code> لا <code>renderToPipeableStream</code>.</li>
<li>لدوال الحافة حدود ضيقة للمعالج والذاكرة (عادةً 50–128 ميغابايت وعشرات الأجزاء من الثانية من زمن المعالج لكل طلب).</li>
<li>لا تزال عمليات جلب البيانات تحتاج إلى الوصول إلى مصدر. إذا كانت قاعدة بياناتك في <code>us-east-1</code> وكان عامل الحافة لديك يعمل في ساو باولو، فقد أضفت للتو زمن تأخير. اقترن العرض على الحافة ببيانات مُكرَّرة على الحافة (Cloudflare D1، Turso، Upstash، نسخ القراءة في Neon).</li>
</ul>
<h2 id="متى-لا-تستخدم-العرض-في-جانب-الخادم">متى <em>لا</em> تستخدم العرض في جانب الخادم</h2>
<ul>
<li><strong>المحتوى الثابت تمامًا</strong> (الصفحات التسويقية، ومنشورات المدونة، والتوثيق): استخدم العرض الثابت. HTML نفسه، ودون كلفة لكل طلب.</li>
<li><strong>التطبيقات عالية التفاعل ذات هيكل مستقر</strong> (محرّر بأسلوب Figma): كلفة الترطيب تفوق فائدة العرض في جانب الخادم. العرض في جانب العميل مع هيكل تطبيق يكفي.</li>
<li><strong>الصفحات التي تتحمّل بضع دقائق من التخلّف (staleness)</strong>: استخدم إعادة التوليد التدريجي (ISR) مع إعادة التحقق (revalidation). تحتفظ بالتخزين المؤقت (caching) عند حافة شبكة CDN مع الحصول على محتوى طازج.</li>
</ul>
<h2 id="قائمة-تحقق-عملية">قائمة تحقق عملية</h2>
<p>قبل شحن العرض في جانب الخادم إلى الإنتاج، تحقّق من الآتي:</p>
<ul>
<li>أنك تستخدم <code>renderToPipeableStream</code> (في Node) أو <code>renderToReadableStream</code> (عند الحافة)، لا <code>renderToString</code> المُهملة للعرض الأساسي.</li>
<li>أن جانب العميل يستخدم <code>hydrateRoot</code> لا <code>ReactDOM.hydrate</code>.</li>
<li>من أن هناك معالج <code>onError</code> يسجّل أخطاء البث، وأن هناك حدًا واحدًا على الأقل يلتقط فشل العرض.</li>
<li>من أن \`\` يغلّف البيانات البطيئة كي يتمكّن الهيكل من البث أولًا.</li>
<li>من أن عمليات جلب البيانات طويلة المدة لديك تملك ذاكرة مؤقتة (caching) على نطاق الطلب (لكل عملية عرض) لتفادي الاستدعاءات المكرّرة.</li>
<li>من أن حزمتك مقسّمة على مستوى المسار — فترطيب الصفحة الحالية لا يحتاج إلا إلى شيفرة JS الخاصة بها.</li>
</ul>
<p>الأنماط التالية التي سننظر إليها — البث من الخادم، والعرض الثابت، وإعادة التوليد التدريجي (ISR)، والترطيب التدرّجي (Progressive Hydration)، ومكوّنات خادم React — تُحسّن كل منها جزءًا من هذه القاعدة.</p>
`,l={book:s,chapter:n,chapterTitle:e,slug:t,title:a,headings:o,html:r};export{s as book,n as chapter,e as chapterTitle,l as default,o as headings,r as html,t as slug,a as title};
